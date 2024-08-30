/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { parseScript } from 'esprima';
import fs from 'fs';
import {
  ArrowFunctionExpression,
  Expression,
  FunctionExpression,
  ObjectExpression,
  SpreadElement,
} from 'estree';
import escodegen from 'escodegen';
import { createLogger, apiLog } from '@crossed/log';
import { Registry, parse } from '@crossed/styled';
import { convertKeyToCss } from '@crossed/styled';
import type { CrossedstyleValues } from '@crossed/styled';
import * as esbuild from 'esbuild';
import path from 'path';
import * as ts from 'typescript';

type Style = Record<string, any>;

const esmBuild = (configPath: string) => {
  const contentFileConfig = fs.readFileSync(
    path.resolve(process.cwd(), configPath),
    { encoding: 'utf8' }
  );
  const codeBuild = esbuild.transformSync(contentFileConfig, {
    loader: 'ts',
    platform: 'browser',
    format: 'cjs',
    target: 'node14',
  });
  // eslint-disable-next-line no-eval
  return codeBuild;
};

const cache = new Map();

export class Loader {
  private logger: ReturnType<typeof createLogger>;

  private fileCache: Map<string, string> = new Map();

  constructor({
    level = 'info',
    configPath,
    isWatch,
    emit,
  }: {
    level?: string;
    configPath?: string;
    isWatch?: boolean;
    emit?: any;
  } = {}) {
    this.logger = createLogger({ label: 'CrossedLoader', level });
    this.logger.debug(
      apiLog({
        events: ['create_instance_success'],
      })
    );

    if (configPath) {
      let code: string;
      try {
        code = esmBuild(configPath).code;
        // eslint-disable-next-line no-eval
        eval(code);
      } catch (e) {
        this.logger.error(e.toString());
      }
      if (isWatch && code) {
        const handleWatch = () => {
          try {
            // eslint-disable-next-line no-eval
            eval(esmBuild(configPath).code);
          } catch (i) {
            this.logger.error(`esmBuild ${i.toString()}`);
          }
          try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const { Registry: R } = require('@crossed/styled');
            Object.entries(R.getThemes()).forEach(([themeName, theme]) => {
              this.addClassname({
                prefix: '.',
                body: {
                  [`${themeName}`]: parse(theme, undefined, true).values,
                },
              });
            });
          } catch (i) {
            this.logger.error(i.toString());
          }
          emit();
        };
        const reg = /require\("(.*)"\)/gi;
        const t = code.matchAll(reg);
        for (const [, value] of t) {
          fs.watch(require.resolve(value).replace(/(\/\w+\.js)$/g, ''), () => {
            Object.keys(require.cache).forEach((key) => {
              if (path.dirname(key) === path.dirname(require.resolve(value))) {
                this.logger.debug(`delete cache of ${key}`);
                delete require.cache[key];
              }
            });
            handleWatch();
          });
        }
        fs.watch(path.resolve(process.cwd(), configPath), handleWatch);
      }
    }
  }

  styleToString = (style: Style) => {
    return Object.keys(style).reduce((acc, key) => {
      const value = style[key];
      if (key === 'marginHorizontal') {
        return `${acc}${convertKeyToCss(
          'marginLeft'
        )}:${value};${convertKeyToCss('marginRight')}:${value};`;
      } else if (key === 'marginVertical') {
        return `${acc}${convertKeyToCss(
          'marginTop'
        )}:${value};${convertKeyToCss('marginBottom')}:${value};`;
      } else if (key === 'paddingHorizontal') {
        return `${acc}${convertKeyToCss(
          'paddingLeft'
        )}:${value};${convertKeyToCss('paddingRight')}:${value};`;
      } else if (key === 'paddingVertical') {
        return `${acc}${convertKeyToCss(
          'paddingTop'
        )}:${value};${convertKeyToCss('paddingBottom')}:${value};`;
        // } else if (key === 'padding') {
        //   return `${acc}${convertKeyToCss(
        //     'paddingTop'
        //   )}:${value};${convertKeyToCss(
        //     'paddingBottom'
        //   )}:${value};${convertKeyToCss(
        //     'paddingLeft'
        //   )}:${value};${convertKeyToCss('paddingRight')}:${value};`;
      }
      return `${acc}${convertKeyToCss(key)}:${value};`;
    }, '');
  };

  getCSS() {
    // console.log(this.fileCache)
    const values = Array.from(this.fileCache.values());
    const { media, hover, focus, active, other } = values.reduce(
      (acc, e) => {
        if (e.startsWith('@media')) {
          acc.media.push(e);
        } else if (e.startsWith('.active')) {
          acc.active.push(e);
        } else if (e.startsWith('.focus')) {
          acc.focus.push(e);
        } else if (e.startsWith('.hover')) {
          acc.hover.push(e);
        } else {
          acc.other.push(e);
        }
        return acc;
      },
      {
        media: [],
        hover: [],
        focus: [],
        active: [],
        other: [],
      }
    );
    return [
      other,
      hover,
      focus,
      active,
      media.sort((a, b) => {
        if (!a.startsWith('@media')) return -1;
        const [, widthA] = a.match(/@media \(min-width: ([0-9]+)px\)/i) || [];
        const [, widthB] = b.match(/@media \(min-width: ([0-9]+)px\)/i) || [];
        if (!widthA) return -1;
        if (!widthB) return 1;
        return Number(widthA) < Number(widthB) ? -1 : 1;
      }),
    ]
      .flat(Infinity)
      .join('\n');
  }

  addClassname = (obj: {
    suffix?: string;
    prefix?: string;
    wrapper?: (_str: string) => string;
    body: Record<string, CrossedstyleValues | string>;
  }) => {
    Object.entries(obj.body).forEach(([key, value]) => {
      // transform { backgroundColor: "blue" } => background-color: blue;

      const styleParsed =
        typeof value === 'string' ? value : this.styleToString(value);

      const className = `${obj.prefix ?? '.'}${key
        .replace(/[#:\[\]\(\)%,\.]/g, '\\$&')
        .replace(/ /g, '-')}${obj.suffix || ''}`;
      // escape some character in css
      const css = `${className} { ${styleParsed} }`;

      // add css in cahce file
      this.fileCache.set(className, obj.wrapper ? obj.wrapper(css) : css);
    });
  };

  _parseFunctionExpression = (
    arg: ArrowFunctionExpression | FunctionExpression
  ) => {
    if (
      arg.type === 'ArrowFunctionExpression' ||
      arg.type === 'FunctionExpression'
    ) {
      const ast = {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: arg,
          },
        ],
      };
      const toto = escodegen.generate(ast);
      let returnEl;
      try {
        // eslint-disable-next-line no-eval
        returnEl = eval(toto)(Registry.getTheme(true));
      } catch (e) {
        this.logger.error(
          `${apiLog({
            events: ['eval_style_function_error'],
          })}: ${e.message}`
        );
      }
      return returnEl;
    }
  };

  parsingExpression(ast: Expression | SpreadElement) {
    const _parseObjectExpression = (arg: ObjectExpression) => {
      if (arg.type === 'ObjectExpression') {
        const ast = {
          type: 'Program',
          body: [
            {
              type: 'ExpressionStatement',
              expression: arg,
            },
          ],
        };
        const toto = escodegen.generate(ast);
        let returnEl;
        try {
          // eslint-disable-next-line no-eval
          returnEl = eval(toto);
        } catch (e) {
          this.logger.error(
            `${apiLog({
              events: ['eval_style_function_error'],
            })}: ${e.message}`
          );
        }
        return returnEl;
      }
    };

    let parsing: Record<string, any>;

    if (ast.type === 'ObjectExpression') {
      parsing = _parseObjectExpression(ast);
    } else if (
      ast.type === 'ArrowFunctionExpression' ||
      ast.type === 'FunctionExpression'
    ) {
      parsing = this._parseFunctionExpression(ast);
    } else {
      this.logger.warn(
        `${apiLog({
          events: ['ast_type_not_implemented'],
        })}      ${ast.type}`
      );
    }
    return parsing;
  }

  loader(t: string): string {
    Object.entries(Registry.getThemes()).forEach(([themeName, theme]) => {
      this.addClassname({
        prefix: '.',
        body: {
          [`${themeName}`]: parse(theme, undefined, true).values,
        },
      });
    });
    let ast: any;
    try {
      ast = (parseScript(
        ts.transpileModule(`const Foo = createStyles(${t})`, {
          compilerOptions: { target: ts.ScriptTarget.ESNext },
        }).outputText
      )?.body || [])[0];
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
    if (
      ast.type !== 'VariableDeclaration' ||
      ast.declarations[0].init.type !== 'CallExpression'
    ) {
      throw new Error('getAst - wrong value');
    }

    const parsing = this.parsingExpression(
      ast.declarations[0].init.arguments[0]
    );
    const result: Record<string, Record<string, string | boolean>> = {};
    const dynamicStyles: string[] = [];
    if (parsing) {
      Object.entries(parsing).forEach(([key, p]) => {
        if (typeof p === 'object') {
          const { $$css, ...obj } = p;
          if ($$css) {
            result[key] = { $$$css: true, ...obj };
          } else {
            Registry.apply(() => obj, {
              addClassname: (e) => {
                if (!result[key]) {
                  result[key] = { $$$css: true };
                }
                result[key] = Object.entries(e.body).reduce<
                  Record<string, string | boolean>
                >((acc, [className, style]) => {
                  const [nameStyle] = Object.keys(style);
                  acc[nameStyle] = acc[nameStyle]
                    ? `${acc[nameStyle]} ${className}`
                    : className;
                  return acc;
                }, result[key]);
                this.addClassname(e);
              },
              isWeb: true,
              cache,
            });
          }
        } else if (typeof p === 'function') {
          const properties = [];

          if (ast.declarations[0].init?.arguments[0]?.body?.properties) {
            properties.push(
              ...ast.declarations[0].init?.arguments[0]?.body?.properties
            );
          } else if (
            ast.declarations[0].init?.arguments[0].type === 'ObjectExpression'
          ) {
            properties.push(
              ...ast.declarations[0].init?.arguments[0].properties
            );
          }
          const property = properties.find(
            ({ key: { name } }: any) => name === key
          );
          if (property) {
            try {
              dynamicStyles.push(
                `${key}:${escodegen.generate(property.value)}`
              );
            } catch (e) {
              console.error(e);
            }
          }
        }
      });
    }
    const str = JSON.stringify(result);
    const completeResult = `${str.replace(/}$/g, '')}${str !== '{}' ? ',' : ''}${dynamicStyles.join(',')}}`;
    return completeResult;
  }
}
