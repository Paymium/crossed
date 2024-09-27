/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { CrossedMethods, StyleSheet, Themes } from './types';

export const inlineStyle = <O extends StyleSheet>(
  stylesParam: (_theme: Themes[keyof Themes]) => O
): CrossedMethods<any> => {
  const isFunction = typeof stylesParam === 'function';
  // console.log({isFunction}, stylesParam)
  if (!isFunction) return stylesParam;
  // return createMethods(stylesParam(Registry.getTheme(isWeb)));
};
