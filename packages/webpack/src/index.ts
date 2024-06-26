/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Compiler } from 'webpack';
import { createLogger, apiLog } from '@crossed/log';
import { Loader } from '@crossed/loader';
import VirtualModulesPlugin from 'webpack-virtual-modules';
import { mkdirSync, readFileSync, statSync, writeFileSync } from 'fs';
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

    /**
     * Load loader if not already in cache
     */
    if (!parseAst) {
      parseAst = new Loader({
        configPath: this.options.configPath,
        level: this.options.level,
        isWatch: this.options.isWatch,
        emit: () => {
          this.writeCss(virtualModules);
        },
      });
    }

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
      const css = parseAst.getCSS() || '';
      virtualModules.writeModule('node_modules/crossed.css', css);
      const pathCss = path.resolve(process.cwd(), '.crossed');

      try {
        statSync(pathCss);
      } catch {
        mkdirSync(pathCss, 0o775);
      }
      try {
        const css = readFileSync(path.resolve(pathCss, 'crossed.css'), {
          encoding: 'utf-8',
        });
        virtualModules.writeModule('node_modules/crossed.css', css);
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
    });

    /**
     * Parse files
     */
    compiler.hooks.normalModuleFactory.tap(pluginName, (factory) => {
      factory.hooks.parser.for('javascript/auto').tap(pluginName, (c) => {
        /**
         * Get all call expression and filter by name (createStyle, withStyle)
         */
        c.hooks.evaluate.for('CallExpression').tap(pluginName, (e: any) => {
          const resource = c.state.current.resource;
          let arg;
          if (e.callee.type === 'Identifier') {
            const isMulti = e.callee?.name === 'createStyles';
            if (e.callee?.name === 'createStyle' || isMulti) {
              arg = e.arguments[0];
            }
            if (e.callee?.name === 'withStyle') {
              arg = e.arguments[1];
            }
            if (arg) {
              /**
               * call name expression is createStyle or withStyle
               * we can parsed argument
               */
              //   console.log(apiLog({
              //     events: ['detect_style_function'],
              //   })
              //   {
              //     file: `${resource.replace(process.cwd(), '')}:${
              //       e.loc.start.line
              //     }`,
              //   }
              // ))
              this.logger.debug(
                `${apiLog({
                  events: ['detect_style_function'],
                })}      ${resource.replace(process.cwd(), '')}:${
                  e.loc.start.line
                }`
              );
              parseAst.parse(arg, isMulti);
            }
          }
        });
      });
    });
  };
}
