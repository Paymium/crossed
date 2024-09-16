/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { CrossedStyle } from './types';

export const composeStyles = (...styles: CrossedStyle[]): CrossedStyle => {
  const stylesVerified = styles.flat(Infinity as 10) as CrossedStyle;
  return stylesVerified;
};
