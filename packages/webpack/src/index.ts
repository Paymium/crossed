/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  ArrowFunctionExpression,
  CallExpression,
  Expression,
  FunctionExpression,
  Identifier,
  Literal,
  ObjectExpression,
  Property,
  SequenceExpression,
  SpreadElement,
} from 'estree';
import fs from 'fs';
import path from 'path';
import escodegen from 'escodegen';
import { parseScript as parse } from 'esprima';
import { Compiler } from 'webpack';
import hashChode from '@crossed/styled/hashCode';
import mq from '@crossed/styled/mq';
import Registry from '@crossed/styled/registry';

type Style = Record<string, any>;

type Cache = Map<string, Set<string>>;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const t = require(path.resolve(process.cwd(), './style.config'));

const theme = Registry.setTheme(t).getTheme();

const styleToString = (style: Style) => {
  return Object.keys(style).reduce(
    (acc, key) =>
      acc +
      key
        .split(/(?=[A-Z])/)
        .join('-')
        .toLowerCase() +
      ':' +
      style[key] +
      ';',
    ''
  );
};

const pluginName = 'StylePlugin';

const parserAst = (
  ast: Expression | SpreadElement,
  cb: (_cssRule: string) => void
) => {
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
        const className = `.c-${hashChode(`${media}${pseudo}${key}${value}`)}`;
        cb(_cssContent(className, { [key]: value }, media, pseudo));
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
        if (
          e.type === 'Property' &&
          (e.key.type === 'Identifier' || e.key.type === 'Literal')
        ) {
          const name =
            e.key.type === 'Identifier'
              ? e.key.name
              : e.key.type === 'Literal'
              ? e.key.value
              : undefined;
          if (
            name &&
            typeof name === 'string' &&
            (name === 'base' || name.startsWith(':'))
          ) {
            const nameTmp = name === 'base' ? undefined : name;
            if (e.value.type === 'ObjectExpression') {
              _parseObjectExpression(e.value, media, nameTmp);
            } else if (e.value.type === 'SequenceExpression') {
              _parseSequenceExpression(e.value, media, nameTmp);
            }
          } else {
            _parseProperty(e, media, pseudo);
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
                expression.left.property.callee.object.type === 'Identifier' &&
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
                  const media = mq.width(
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    min.value,

                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    max?.value || undefined
                  );
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
      const returnEl = JSON.stringify(eval(toto)(theme));
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
      // eslint-disable-next-line no-eval
      const returnEl = JSON.stringify(eval(toto)(theme));
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
};

export type StylePluginOptions = { cssOutput?: string };

export default class StylePlugin {
  fileCache: Cache = new Map();

  isFirst = true;

  cssOutput: string;

  constructor(options: StylePluginOptions = {}) {
    this.cssOutput = options.cssOutput || './public/output.css';
    fs.writeFileSync(path.resolve(process.cwd(), this.cssOutput), ``);
  }

  apply = (compiler: Compiler) => {
    compiler.hooks.afterCompile.tap(pluginName, () => {
      const css = new Set();
      this.fileCache.forEach((v) => {
        v.forEach((c) => {
          css.add(c);
        });
      });
      const newContent = Array.from(css.values()).join('');
      const oldContent = fs.readFileSync(
        path.resolve(process.cwd(), this.cssOutput),
        { encoding: 'utf8' }
      );
      if (oldContent !== newContent) {
        fs.writeFileSync(
          path.resolve(process.cwd(), this.cssOutput),
          newContent,
          { flag: 'w' }
        );
      }
      this.isFirst = false;
    });

    compiler.hooks.normalModuleFactory.tap(pluginName, (factory) => {
      factory.hooks.module.tap(pluginName, (c) => {
        const resource = (c as any).resource;
        if (
          resource &&
          !resource.includes('node_modules') &&
          !resource.includes('lib')
        ) {
          if (this.isFirst) {
            this.fileCache.set(resource, new Set());
          }
          (c as any).parser.hooks.evaluate
            .for('CallExpression')
            .tap(pluginName, (e: CallExpression) => {
              let arg;
              if (e.callee.type === 'Identifier') {
                if (e.callee?.name === 'createStyle') {
                  arg = e.arguments[0];
                }
                if (e.callee?.name === 'withStyle') {
                  arg = e.arguments[1];
                }
                if (arg) {
                  const file = (c as any).parser.state.current.resource;
                  parserAst(arg, (cssRule) => {
                    // console.log("detect in");
                    // console.log(file);
                    // console.log(this.fileCache);
                    // console.log("____________________");
                    if (!this.fileCache.has(file)) {
                      this.fileCache.set(file, new Set());
                    }
                    // console.log(resource, c.parser.state.current.request)
                    this.fileCache.get(file)?.add(cssRule);
                  });
                }
              }
            });
        }
        return c;
      });
    });
  };
}
