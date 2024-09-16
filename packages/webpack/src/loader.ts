/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Loader } from '@crossed/loader';

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
  const options: LoaderOptions = this.getOptions();

  const { parseAst } = options.constants;
  let sourceTmp = source;
  const t = extractArgument(source);
  // console.log(sourceTmp, t)
  if (t && Array.isArray(t) && t.length > 0) {
    t.forEach((a) => {
      try {
        sourceTmp = sourceTmp.replace(a, parseAst.loader(a));
      } catch (e) {
        console.error(e);
      }
    });
  }
  return sourceTmp;
}
