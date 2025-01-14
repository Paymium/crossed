/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import path from 'path';
import fs from 'fs';
import {
  ArrowFunctionExpression,
  // CallExpression,
  Expression,
  FunctionExpression,
  // Identifier,
  // Literal,
  ObjectExpression,
  // Property,
  // SequenceExpression,
  SpreadElement,
} from 'estree';
// import { parseScript as parse } from 'esprima';
import escodegen from 'escodegen';
import { createLogger, apiLog } from '@crossed/log';
import { Registry, parse } from '@crossed/styled';
import { convertKeyToCss } from '@crossed/styled';
import type { CrossedstyleValues } from '@crossed/styled';
import * as esbuild from 'esbuild';

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

  return codeBuild;
};

const cache = new Map();

export class Loader {
  private emit?: () => void;
  private logger: ReturnType<typeof createLogger>;

  private css: string;

  private fileCache: Map<string, string> = new Map();

  constructor({
    level = 'info',
    configPath,
    isWatch,
    emit,
    css,
  }: {
    level?: string;
    configPath?: string;
    isWatch?: boolean;
    emit?: any;
    css?: string;
  } = {}) {
    this.emit = emit;
    this.css = css || '';
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
          this.emit?.();
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
      } else if (key === 'padding') {
        return `${acc}${convertKeyToCss(
          'paddingTop'
        )}:${value};${convertKeyToCss(
          'paddingBottom'
        )}:${value};${convertKeyToCss(
          'paddingLeft'
        )}:${value};${convertKeyToCss('paddingRight')}:${value};`;
      }
      return `${acc}${convertKeyToCss(key)}:${value};`;
    }, '');
  };

  getCSS() {
    // console.log(this.fileCache)
    const values = Array.from([
      ...this.fileCache.values(),
      ...this.css.split(/\r?\n/),
    ]);
    const { media, hover, focus, active, other, theme } = values.reduce(
      (acc, e) => {
        if (
          !acc.media.includes(e) &&
          !acc.active.includes(e) &&
          !acc.focus.includes(e) &&
          !acc.hover.includes(e) &&
          !acc.other.includes(e)
        ) {
          if (e.startsWith('@media')) {
            acc.media.push(e);
          } else if (e.startsWith('.active')) {
            acc.active.push(e);
          } else if (e.startsWith('.focus')) {
            acc.focus.push(e);
          } else if (e.startsWith('.hover')) {
            acc.hover.push(e);
          } else if (e.startsWith('.dark') || e.startsWith('.light')) {
            acc.theme.push(e);
          } else {
            acc.other.push(e);
          }
        }
        return acc;
      },
      {
        media: [],
        hover: [],
        focus: [],
        active: [],
        other: [],
        theme: [],
      }
    );
    return [
      theme,
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
      .filter((value, index, array) => array.indexOf(value) === index)
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
      this.emit?.();
    });
  };

  parse(ast: Expression | SpreadElement, isMulti?: boolean) {
    // const plugins = Registry.getPlugins();
    // const ctx = plugins.reduce((acc, { utils }) => {
    //   return { ...acc, ...(utils?.() || undefined) };
    // }, {});
    const theme = Registry.getThemes();
    if (theme) {
      Object.entries(Registry.getThemes()).forEach(([themeName, theme]) => {
        this.addClassname({
          prefix: '.',
          body: {
            [`${themeName}`]: parse(theme, undefined, true).values,
          },
        });
      });
    }

    // plugins.forEach(({ init }) =>
    //   init?.({ addClassname: this.addClassname, isWeb: true, ...ctx })
    // );
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

    const _parseFunctionExpression = (
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

    let parsing: Record<string, any>;

    if (ast.type === 'ObjectExpression') {
      parsing = _parseObjectExpression(ast);
    } else if (
      ast.type === 'ArrowFunctionExpression' ||
      ast.type === 'FunctionExpression'
    ) {
      parsing = _parseFunctionExpression(ast);
    } else {
      this.logger.warn(
        `${apiLog({
          events: ['ast_type_not_implemented'],
        })}      ${ast.type}`
      );
    }

    if (parsing) {
      if (isMulti) {
        Object.entries(parsing).forEach(([, p]) => {
          Registry.apply(() => p, {
            addClassname: this.addClassname,
            isWeb: true,
            cache,
          });
        });
      } else {
        Registry.apply(() => parsing, {
          addClassname: this.addClassname,
          isWeb: true,
          cache,
        });
      }
    }
  }
}
