/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Compiler, NormalModule } from 'webpack';
import { createLogger, apiLog } from '@crossed/log';
import { Loader } from '@crossed/loader';
import { mkdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import VirtualModulesPlugin from 'webpack-virtual-modules';
import path from 'path';

const pluginName = 'CrossedPlugin';

export type StylePluginOptions = {
  configPath: string;
  level?: string;
  isServer?: boolean;
  isWatch?: boolean;
};

let parseAst: Loader;

export default class StylePlugin {
  logger: ReturnType<typeof createLogger>;

  constructor(public options: StylePluginOptions) {
    this.options = options;

    this.logger = createLogger({
      label: 'CrossedWebpackPlugin',
      level: options.level || 'info',
    });
  }

  writeCss(virtualModules: VirtualModulesPlugin) {
    const css = parseAst.getCSS() || '';
    if (css) {
      virtualModules.writeModule('node_modules/crossed.css', css);

      const pathCss = path.resolve(process.cwd(), '.crossed');

      try {
        statSync(pathCss);
      } catch {
        mkdirSync(pathCss, 0o775);
      }
      writeFileSync(path.resolve(pathCss, 'crossed.css'), css);

      this.logger.info(
        apiLog({
          events: ['css_output_success'],
        })
      );
    }
  }
  apply = (compiler: Compiler) => {
    this.logger.debug('apply StylePlugin');

    /**
     * Add virtual module crossed.css
     */
    const virtualModules = new VirtualModulesPlugin();
    virtualModules.apply(compiler);

    const pathCss = path.resolve(process.cwd(), '.crossed');

    let css = '';
    try {
      statSync(pathCss);
    } catch {
      mkdirSync(pathCss, 0o775);
    }
    try {
      css = readFileSync(path.resolve(pathCss, 'crossed.css'), {
        encoding: 'utf-8',
      });
      // virtualModules.writeModule('node_modules/crossed.css', css);
      this.logger.info(
        apiLog({
          events: ['css_output_success'],
        })
      );
    } catch (e) {
      this.logger.error(
        apiLog({
          events: ['css_output_error'],
        })
      );
    }

    /**
     * Load loader if not already in cache
     */
    if (!parseAst) {
      parseAst = new Loader({
        css: css,
        configPath: this.options.configPath,
        level: this.options.level,
        isWatch: this.options.isWatch,
        emit: () => {
          this.writeCss(virtualModules);
        },
      });
    }

    compiler.hooks.make.tap(pluginName, (compilation) => {
      const debug = true;
      const constants = {
        configPath: this.options.configPath,
        parseAst,
      };

      const tapCallback = (_: any, normalModule: NormalModule) => {
        const userRequest = normalModule.resource || '';

        const startIndex =
          userRequest.lastIndexOf('!') === -1
            ? 0
            : userRequest.lastIndexOf('!') + 1;

        const moduleRequest = userRequest
          .substring(startIndex)
          .replace(/\\/g, '/');

        if (
          /\.jsx?/.test(path.extname(userRequest)) ||
          /\.tsx?/.test(path.extname(userRequest))
        ) {
          type NormalModuleLoader = {
            loader: string;
            options: any;
            ident?: string;
            type?: string;
          };

          (normalModule.loaders as NormalModuleLoader[]).push({
            loader: require.resolve('./loader'),
            options: {
              moduleRequest,
              operations: [],
              constants: { ...constants, userRequest },
            },
          });

          if (debug) {
            // eslint-disable-next-line no-console
            // console.log(`\n[${pluginName}] Use loader for "${moduleRequest}".`);
          }
        }
      };

      const NormalModuleD = compiler.webpack?.NormalModule;
      const isNormalModuleAvailable =
        Boolean(NormalModuleD) && Boolean(NormalModuleD.getCompilationHooks);

      if (isNormalModuleAvailable) {
        NormalModuleD.getCompilationHooks(compilation).loader.tap(
          pluginName,
          tapCallback
        );
      } else {
        compilation.hooks.normalModuleLoader.tap(pluginName, tapCallback);
      }
    });

    /**
     * Wait end parsing and write css
     */
    compiler.hooks.afterCompile.tap(pluginName, () => {
      this.writeCss(virtualModules);
    });

    /**
     * Load at run css
     */
    compiler.hooks.beforeCompile.tap(pluginName, () => {
      virtualModules.writeModule(
        'node_modules/crossed.css',
        parseAst.getCSS() || ''
      );
    });
  };
}
