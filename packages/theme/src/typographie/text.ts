/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { TextFont } from '../types/font';

export const textFont = {
  lineHeight: {
    'xs': 18,
    'sm': 20,
    'md': 24,
    'lg': 28,
    'xl': 30,
  },
  fontSize: {
    'xs': 12,
    'sm': 14,
    'md': 16,
    'lg': 18,
    'xl': 20,
  },
  color: 'black',
  family: {
    'regular': 'Inter-Regular',
    'medium': 'Inter-Medium',
    'semibold': 'Inter-Semibold',
    'bold': 'Inter-Bold',
  },
} as const satisfies TextFont;
