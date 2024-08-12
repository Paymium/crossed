/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { CrossedMethods, StyleSheet, Themes } from './types';
import { Registry } from './Registry';
import { createMethods } from './createMethods';
import { isWeb } from './isWeb';

export const createStyles = <O extends Record<C, StyleSheet>, C extends string>(
  stylesParam: (_theme: Themes[keyof Themes]) => {
    [key in keyof O]: O[key];
  }
) => {
  let results = stylesParam(Registry.getTheme(isWeb));
  const foo = new Proxy(
    Object.entries(results).reduce<{
      [key in keyof O]: CrossedMethods<O[key]>;
    }>((acc, [keyStyle, styleOfKey]) => {
      (acc as any)[keyStyle] = createMethods(styleOfKey);
      return acc;
    }, {} as any),
    {
      get(cible, prop) {
        return createMethods((results as any)[prop]);
      },
    }
  );

  !isWeb &&
    Registry.subscribe(() => {
      results = stylesParam(Registry.getTheme(isWeb));
    });

  return foo;
};
