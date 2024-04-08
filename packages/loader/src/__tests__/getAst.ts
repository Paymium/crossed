/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { parseScript as parse } from 'esprima';

export const getAst = (value: string) => {
  const [ast] = parse(`const Foo = createStyles(${value})`).body;
  if (
    ast.type !== 'VariableDeclaration' ||
    ast.declarations[0].init.type !== 'CallExpression'
  ) {
    throw new Error('getAst - wrong value');
  }
  return ast.declarations[0].init.arguments[0];
};
