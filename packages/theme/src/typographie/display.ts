/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { DysplayFont } from '../types/font';

export const displayFont = {
  lineHeight: {
    'xs': 32,
    'sm': 38,
    'md': 44,
    'lg': 60,
    'xl': 72,
    '2xl': 90,
  },
  fontSize: {
    'xs': 24,
    'sm': 30,
    'md': 36,
    'lg': 48,
    'xl': 60,
    '2xl': 72,
  },
  fontWeight: {
    'regular': 400,
    'medium': 500,
    'semibold': 600,
    'bold': 700,
  },
  color: 'black',
  family: 'Inter',
} as const satisfies DysplayFont;
