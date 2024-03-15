/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import path from 'path';
import { execSync } from 'child_process';
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
import { Registry } from '@crossed/styled/registry';
import { convertKeyToCss } from '@crossed/styled/plugins';
import type { CrossedstyleValues } from '@crossed/styled';

type Style = Record<string, any>;

export class Loader {
  private logger: ReturnType<typeof createLogger>;

  private fileCache: Set<string> = new Set();

  constructor({
    level = 'info',
    configPath,
  }: {
    level?: string;
    configPath?: string;
  } = {}) {
    this.logger = createLogger({ label: 'CrossedLoader', level });
    this.logger.debug(
      apiLog({
        events: ['create_instance_success'],
      }).message
    );

    if (configPath) {
      try {
        execSync(
          `npx tsc --outDir ${path.resolve(
            process.cwd(),
            './lib'
          )} ${path.resolve(
            process.cwd(),
            configPath
          )} --skipLibCheck --module NodeNext --moduleResolution nodenext --esModuleInterop`
        );
      } catch (e) {
        this.logger.error(e.toString());
      }

      try {
        require(path.resolve(process.cwd(), './lib/style.config'));
      } catch (e) {
        this.logger.error(e.toString());
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
      }
      return `${acc}${convertKeyToCss(key)}:${value};`;
    }, '');
  };

  getCSS() {
    return Array.from(this.fileCache.values()).join('\n');
  }

  addClassname = (obj: {
    suffix?: string;
    prefix?: string;
    wrapper?: (_str: string) => string;
    body: Record<string, CrossedstyleValues>;
    file: string;
  }) => {
    Object.entries(obj.body).forEach(([key, value]) => {
      // transform { backgroundColor: "blue" } => background-color: blue;
      const styleParsed = this.styleToString(value);

      // escape some character in css
      const css = `.${obj.prefix || ''}${key.replace(/[#:\[\]%,]/g, '\\$&')}${
        obj.suffix || ''
      } { ${styleParsed} }`;

      // add css in cahce file
      this.fileCache.add(obj.wrapper ? obj.wrapper(css) : css);
    });
  };

  parse(ast: Expression | SpreadElement, isMulti?: boolean) {
    const theme = Registry.getTheme();
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
            apiLog({
              events: ['eval_style_function_error'],
            }).message,
            { message: e.message, theme }
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
          returnEl = eval(toto)({ theme });
        } catch (e) {
          this.logger.error(
            apiLog({
              events: ['eval_style_function_error'],
            }).message,
            { message: e.message, theme }
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
        apiLog({
          events: ['ast_type_not_implemented'],
        }).message,
        { file: ast.type }
      );
    }

    if (parsing) {
      if (isMulti) {
        Object.entries(parsing).forEach(([, p]) => {
          Registry.apply(() => p, {
            addClassname: this.addClassname,
            isWeb: true,
          });
        });
      } else {
        Registry.apply(() => parsing, {
          addClassname: this.addClassname,
          isWeb: true,
        });
      }
    }
  }
}
