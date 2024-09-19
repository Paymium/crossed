/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Loader } from '@crossed/loader';
import { parseScript } from 'esprima';
import * as ts from 'typescript';

interface LoaderOptions {
  operations: any[];
  // operations: SerializableOperation[];
  moduleRequest: string;
  constants: {
    parseAst: Loader;
  };
}

interface ModifyModuleSourceLoader {
  getOptions?: () => LoaderOptions;
}

function extractArgument(str: string) {
  const regex = /createStyles\s*\(/g;
  let match;
  const results = [];

  while ((match = regex.exec(str)) !== null) {
    let startIndex = match.index + match[0].length;
    let openParentheses = 1;
    let endIndex = startIndex;

    while (openParentheses > 0 && endIndex < str.length) {
      if (str[endIndex] === '(') {
        openParentheses++;
      } else if (str[endIndex] === ')') {
        openParentheses--;
      }
      endIndex++;
    }

    if (openParentheses === 0) {
      results.push(str.slice(startIndex, endIndex - 1).trim());
    }
  }
  return results;
}

export default function modifyModuleSourceLoader(
  this: ModifyModuleSourceLoader,
  source: string
): string {
  const { constants, moduleRequest }: LoaderOptions = this.getOptions();
  const { parseAst } = constants;
  const t = extractArgument(source);
  // console.log(sourceTmp, t)
  if (t && Array.isArray(t) && t.length > 0) {
    t.forEach((a) => {
      let ast: any;
      try {
        ast = (parseScript(
          ts.transpileModule(`const Foo = createStyles(${a})`, {
            compilerOptions: { target: ts.ScriptTarget.ESNext },
          }).outputText
        )?.body || [])[0];
        parseAst.parse(ast.declarations[0].init.arguments[0], true);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(moduleRequest, e);
      }
    });
  }
  return source;
}
