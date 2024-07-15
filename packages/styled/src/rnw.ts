/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

type RnwStyle = string | null | false | undefined;

export const rnw = (
  ...className: RnwStyle[]
): { style: Record<string, string | number | boolean> } => {
  const cache = new Map();
  // console.log('params', className);
  className.forEach((c) => {
    if (!c || c === null) {
      return;
    }
    let classNam = c;
    if (typeof classNam === 'object' && 'className' in classNam) {
      classNam = classNam.className().className;
    }
    // console.log(classNam);
    const [result] = classNam.match(/^(.*?)-(?=\[)/i) || [];
    if (result) {
      cache.set(result, classNam);
    }
  }, []);
  return {
    style: Array.from(cache.values()).reduce(
      (acc, cla) => {
        acc[cla] = cla;
        return acc;
      },
      { $$css: true }
    ),
  };
};
