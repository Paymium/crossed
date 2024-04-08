/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { colorsDark, colorsLight } from './colors';
import type { Theme } from './types';

const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 18,
  xl: 24,
  100: 100,
};

const size: Theme['size'] = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
};

export const fontSize: Theme['fontSize'] = {
  'xxs': 10,
  'xs': 12,
  'sm': 14,
  'default': 14,
  'md': 16,
  'lg': 18,
  'xl': 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
};

export const lightTheme = {
  colors: colorsLight,
  fontFamily: 'Roboto',
  space,
  // padding,
  size,
  fontSize,
} satisfies Theme;

export const darkTheme = {
  colors: colorsDark,
  fontFamily: 'Roboto',
  space,
  // padding,
  size,
  fontSize,
} as const;
