/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import fs from 'fs';
import path from 'path';
import { Compiler } from 'webpack';
import { createLogger, apiLog } from '@crossed/log';
import { Loader } from '@crossed/loader';
import VirtualModulesPlugin from 'webpack-virtual-modules';

const pluginName = 'CrossedPlugin';

export type StylePluginOptions = {
  cssOutput?: string;
  level?: string;
  isServer?: boolean;
};

let parseAst: Loader;

export default class StylePlugin {
  logger: ReturnType<typeof createLogger>;

  constructor(
    public options: StylePluginOptions = { cssOutput: './public/output.css' }
  ) {
    this.options = options;
    fs.writeFileSync(path.resolve(process.cwd(), options.cssOutput), ``);

    this.logger = createLogger({
      label: 'CrossedWebpackPlugin',
      level: options.level || 'info',
    });
  }

  apply = (compiler: Compiler) => {
    this.logger.debug('apply StylePlugin');
    const virtualModules = new VirtualModulesPlugin();

    compiler.options.plugins.push(virtualModules);

    if (!parseAst) {
      parseAst = new Loader({
        level: this.options.level,
      });
    }

    compiler.hooks.afterCompile.tap(pluginName, () => {
      const newContent = parseAst.getCSS();
      if (newContent) {
        virtualModules.writeModule('node_modules/crossed.css', newContent);
        this.logger.info(
          apiLog({
            events: ['css_output_success'],
          })
        );
      }
    });

    compiler.hooks.normalModuleFactory.tap(pluginName, (factory) => {
      factory.hooks.parser.for('javascript/auto').tap(pluginName, (c) => {
        c.hooks.evaluate.for('CallExpression').tap(pluginName, (e: any) => {
          const resource = c.state.current.resource;
          let arg;
          if (e.callee.type === 'Identifier') {
            if (e.callee?.name === 'createStyle') {
              arg = e.arguments[0];
            }
            if (e.callee?.name === 'withStyle') {
              arg = e.arguments[1];
            }
            if (arg) {
              this.logger.debug(
                apiLog({
                  events: ['detect_style_function'],
                }).message,
                { file: resource.replace(process.cwd(), '') }
              );
              parseAst.parse(arg);
            }
          }
        });
      });
    });
  };
}
