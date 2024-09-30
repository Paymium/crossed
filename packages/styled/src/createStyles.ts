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

export const createStyles = <
  O extends Record<C, StyleSheet | ((..._params: unknown[]) => any)>,
  C extends string,
>(
  stylesParam: (_theme: Themes[keyof Themes]) => O
) => {
  let results = stylesParam(Registry.getTheme(isWeb));
  const foo = new Proxy(
    Object.entries(results).reduce<{
      [key in keyof O]: O[key] extends Function
        ? O[key]
        : CrossedMethods<O[key]>;
    }>((acc, [keyStyle, styleOfKey]) => {
      (acc as any)[keyStyle] =
        typeof styleOfKey === 'function'
          ? styleOfKey
          : createMethods(styleOfKey);
      return acc;
    }, {} as any),
    {
      get(cible, prop) {
        return typeof (results as any)[prop] === 'function'
          ? (results as any)[prop]
          : createMethods((results as any)[prop]);
      },
    }
  );

  !isWeb &&
    Registry.subscribe(() => {
      results = stylesParam(Registry.getTheme(isWeb));
    });

  return foo;
};
