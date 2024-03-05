/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import path from 'path';
import {
  ArrowFunctionExpression,
  // CallExpression,
  Expression,
  FunctionExpression,
  Identifier,
  Literal,
  ObjectExpression,
  Property,
  SequenceExpression,
  SpreadElement,
} from 'estree';
import { parseScript as parse } from 'esprima';
import escodegen from 'escodegen';
import mq from '@crossed/styled/mq';
import { createLogger, apiLog } from '@crossed/log';
import { Registry } from '@crossed/styled/registry';

type Style = Record<string, any>;

// eslint-disable-next-line @typescript-eslint/no-var-requires
let t = {};

try {
  t = require(path.resolve(process.cwd(), './style.config'));
} catch (e) {
  console.log('not found config theme');
}

const theme = Registry.setTheme(t).getTheme();

const convertToPx = [
  'lineHeight',
  'margin',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'fontSize',
  'borderWidth',
  'borderBottomWidth',
  'borderTopWidth',
  'borderLeftWidth',
  'borderRightWidth',
  'borderRadius',
  'padding',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'gap',
];

const convertKeyToCss = (key: string) =>
  key
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase();

const normalizeUnitPixel = (value: any) => `${value}px`;

const styleToString = (style: Style) => {
  return Object.keys(style).reduce((acc, key) => {
    const value = style[key];
    return `${acc}${convertKeyToCss(key)}:${
      convertToPx.includes(key) ? normalizeUnitPixel(value) : value
    };`;
  }, '');
};

export class Loader {
  private logger: ReturnType<typeof createLogger>;

  private fileCache: Set<string> = new Set();

  constructor({ level }: { level?: string } = {}) {
    this.logger = createLogger({ label: 'CrossedLoader', level });
    this.logger.debug(
      apiLog({
        events: ['create_instance_success'],
      }).message
    );
  }

  getCSS() {
    return Array.from(this.fileCache.values()).join('');
  }

  parse(ast: Expression | SpreadElement) {
    const _cssContent = (
      className: string,
      style: Style,
      media?: string,
      pseudo?: string
    ) => {
      const styleParsed = styleToString(style);
      const css = `${className}${pseudo || ''} { ${styleParsed} }`;
      return `${media?.startsWith('@media') ? `${media} { ${css} }` : css}\n`;
    };

    const _parseProperty = (a: Property, media?: string, pseudo?: string) => {
      if (
        a.value.type === 'Literal' &&
        (a.key.type === 'Literal' || a.key.type === 'Identifier')
      ) {
        const key = (a.key as Identifier).name || (a.key as Literal).value;
        if (typeof key === 'string') {
          const value = a.value.value;
          // console.log(media)
          const className = `.${media ? 'md:' : ''}${convertKeyToCss(key)}-[${
            convertToPx.includes(key) ? normalizeUnitPixel(value) : value
          }]`;
          this.fileCache.add(
            _cssContent(className, { [key]: value }, media, pseudo)
          );
        }
      }
    };

    const _parseObjectExpression = (
      arg: ObjectExpression,
      media?: string,
      pseudo?: string
    ) => {
      if (arg?.type === 'ObjectExpression') {
        arg.properties.forEach((e) => {
          if (e.type === 'Property') {
            if (e.key.type === 'Identifier' || e.key.type === 'Literal') {
              const name =
                e.key.type === 'Identifier'
                  ? e.key.name
                  : e.key.type === 'Literal'
                  ? e.key.value
                  : undefined;
              if (
                name &&
                typeof name === 'string' &&
                (name === 'base' ||
                  name.startsWith(':') ||
                  name.startsWith('@media') ||
                  name === 'variants')
              ) {
                const nameTmp =
                  name === 'base' || name === 'variants' ? undefined : name;
                if (e.value.type === 'ObjectExpression') {
                  _parseObjectExpression(e.value, media, nameTmp);
                } else if (e.value.type === 'SequenceExpression') {
                  _parseSequenceExpression(e.value, media, nameTmp);
                }
              } else {
                if (e.value.type === 'ObjectExpression') {
                  _parseObjectExpression(e.value, media, undefined);
                }
                _parseProperty(e, media, pseudo);
              }
            } else if (
              e.key.type === 'CallExpression' &&
              e.key.callee.type === 'MemberExpression' &&
              e.key.callee.object.type === 'Identifier' &&
              e.key.callee.object.name === 'mq' &&
              e.key.callee.property.type === 'Identifier' &&
              e.key.callee.property.name === 'width' &&
              e.value.type === 'ObjectExpression'
            ) {
              const [min, max] = e.key.arguments;
              if (
                min &&
                min.type === 'Literal' &&
                ((max && max.type === 'Literal') || !max)
              ) {
                const media = mq.width(min.value, max?.value || undefined);
                // console.log(media, min)
                e.value.properties.forEach((e) => {
                  if (e.type === 'Property') {
                    _parseProperty(e, media, pseudo);
                  }
                });
              }
            }
          }
        });
      }
    };

    const _parseSequenceExpression = (
      arg: SequenceExpression,
      media?: string,
      pseudo?: string
    ) => {
      if (arg.type === 'SequenceExpression') {
        arg.expressions.forEach((expression) => {
          if (expression.type === 'AssignmentExpression') {
            if (expression.right.type === 'ObjectExpression') {
              if (
                expression.left.type === 'MemberExpression' &&
                expression.left.property.type === 'CallExpression'
              ) {
                if (
                  expression.left.property.type === 'CallExpression' &&
                  expression.left.property.callee.type === 'MemberExpression' &&
                  expression.left.property.callee.object.type ===
                    'Identifier' &&
                  expression.left.property.callee.property.type ===
                    'Identifier' &&
                  expression.left.property.callee.object.name === 'mq' &&
                  expression.left.property.callee.property.name === 'width'
                ) {
                  const [min, max] = expression.left.property.arguments;
                  if (
                    min &&
                    min.type === 'Literal' &&
                    ((max && max.type === 'Literal') || !max)
                  ) {
                    const media = mq.width(min.value, max?.value || undefined);
                    console.log(media)
                    expression.right.properties.forEach((e) => {
                      if (e.type === 'Property') {
                        _parseProperty(e, media, pseudo);
                      }
                    });
                  }
                }
              } else {
                _parseObjectExpression(expression.right, media, pseudo);
              }
            }
          }
        });
      }
    };

    // const _parse

    const _parseFunctionExpression = (arg: FunctionExpression) => {
      if (arg.type === 'FunctionExpression') {
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
        // eslint-disable-next-line no-eval
        const returnEl = JSON.stringify(eval(toto)({ theme, mq }));
        const [body] = parse(`const toto = ${returnEl}`).body;
        if (
          body.type === 'VariableDeclaration' &&
          body.declarations[0].init.type === 'ObjectExpression'
        ) {
          _parseObjectExpression(body.declarations[0].init);
        }
      }
    };

    const _parseArrowFunctionExpression = (arg: ArrowFunctionExpression) => {
      if (arg.type === 'ArrowFunctionExpression') {
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
          returnEl = JSON.stringify(eval(toto)({ theme, mq }));
        } catch (e) {
          this.logger.error(
            apiLog({
              events: ['eval_style_function_error'],
            }).message,
            { message: e.message, theme }
          );
        }
        const [body] = parse(`const toto = ${returnEl}`).body;
        if (
          body.type === 'VariableDeclaration' &&
          body.declarations[0].init.type === 'ObjectExpression'
        ) {
          _parseObjectExpression(body.declarations[0].init);
        }
      }
    };

    if (ast.type === 'ObjectExpression') {
      _parseObjectExpression(ast);
    } else if (ast.type === 'SequenceExpression') {
      _parseSequenceExpression(ast);
    } else if (ast.type === 'FunctionExpression') {
      _parseFunctionExpression(ast);
    } else if (ast.type === 'ArrowFunctionExpression') {
      _parseArrowFunctionExpression(ast);
    }
  }
}

// const loader = new Loader();

// export { loader };
