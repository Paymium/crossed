/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Loader } from '@crossed/loader';
import { parseScript } from 'esprima';
import * as ts from 'typescript';

function extractArgument(str: string, regex: RegExp) {
  let match;
  const results = [];

  while ((match = regex.exec(str)) !== null) {
    const startIndex = match.index + match[0].length;
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
  parseAst: Loader,
  source: string
): string {
  const parse = (data: string[], isMulti: boolean) => {
    if (data && Array.isArray(data) && data.length > 0) {
      data.forEach((a) => {
        let ast: any;
        try {
          ast = (parseScript(
            ts.transpileModule(`const Foo = createStyles(${a})`, {
              compilerOptions: { target: ts.ScriptTarget.ESNext },
            }).outputText
          )?.body || [])[0];
          parseAst.parse(ast.declarations[0].init.arguments[0], isMulti);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e);
        }
      });
    }
  };

  const t = extractArgument(source, /createStyles\s*\(/g);
  const f = extractArgument(source, /inlineStyle\s*\(/g);
  parse(t, true);
  parse(f, false);
  return source;
}
