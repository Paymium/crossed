/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { colorsDark, colorsLight, paymiumLight } from './colors';
import { font } from './font';
import { space } from './space';
import type { Theme } from './types/theme';

export const lightTheme = {
  colors: colorsLight,
  space,
  font,
} as const satisfies Theme;

export const darkTheme = {
  colors: colorsDark,
  space,
  font: {
    ...font,
    color: 'white',
  },
} as const satisfies Theme;

export const paymiumTheme = {
  colors: paymiumLight,
  space,
  font: {
    lineHeight: {
      xs: 14,
      sm: 17,
      md: 20,
      lg: 23,
      xl: 30,
      h6: 36,
      h5: 40,
      h4: 46,
      h3: 50,
      h2: 56,
      h1: 60,
    },
    fontSize: {
      xs: 11,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 24,
      h6: 28,
      h5: 32,
      h4: 36,
      h3: 40,
      h2: 44,
      h1: 48,
    },
    fontWeight: {
      xs: '400',
      sm: '400',
      md: '400',
      lg: '700',
      xl: '700',
      h6: '700',
      h5: '700',
      h4: '700',
      h3: '700',
      h2: '700',
      h1: '700',
    },
    color: 'black',
    family: 'Overpass',
  },
} as const satisfies Theme;
