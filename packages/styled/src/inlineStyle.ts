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

export const inlineStyle = <O extends StyleSheet>(
  stylesParam: (_theme: Themes[keyof Themes]) => O
): CrossedMethods<any> => {
  return createMethods(stylesParam(Registry.getTheme(isWeb)));
};
