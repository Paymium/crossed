/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Font } from './types/font';

export const font = {
  lineHeight: {
    xs: 13,
    sm: 16,
    md: 18,
    lg: 21,
    xl: 27,
    h6: 32,
    h5: 37,
    h4: 41,
    h3: 46,
    h2: 51,
    h1: 55,
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
  family: 'Arial',
} as const satisfies Font;
