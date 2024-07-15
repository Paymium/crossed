/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { StyleSheet, Themes } from './types';

export const createStyles = <O extends Record<C, StyleSheet>, C extends string>(
  stylesParam: (_theme: Themes[keyof Themes]) => {
    [key in keyof O]: O[key];
  }
): {
  [key in keyof O]: O[key];
} => {
  // console.log(process.env)
  // return typeof stylesParam === 'function'
  //   ? stylesParam(Registry.getTheme(isWeb))
  //   : stylesParam;
  const isFunction = typeof stylesParam === 'function';
  // console.log({isFunction}, stylesParam)
  if (!isFunction) return stylesParam;
};
