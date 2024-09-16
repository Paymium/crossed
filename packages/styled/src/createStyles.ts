/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { isWeb } from './isWeb';
import { Registry } from './Registry';
import type {
  AllAvailableStyles,
  CrossedStyle,
  StyleSheet,
  Themes,
} from './types';

export const createStyles = <
  O extends Record<C, StyleSheet | F>,
  C extends string,
  F extends (..._params: unknown[]) => AllAvailableStyles,
  R extends {
    [key in keyof O]: O[key];
  },
>(
  stylesParam: (_theme: Themes[keyof Themes]) => R
): {
  [key in keyof R]: R[key] extends (..._p: infer P) => any
    ? (..._p: P) => CrossedStyle
    : CrossedStyle;
} => {
  return (
    typeof stylesParam === 'function'
      ? stylesParam(Registry.getTheme(isWeb))
      : stylesParam
  ) as any;
};
