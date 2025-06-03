/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { TextFontSize } from '../types/font';

export const textFontSize = {
  'xs': { lineHeight: 18, fontSize: 12 },
  'sm': { lineHeight: 20, fontSize: 14 },
  'md': { lineHeight: 24, fontSize: 16 },
  'lg': { lineHeight: 28, fontSize: 18 },
  'xl': { lineHeight: 30, fontSize: 20 },
} as const satisfies TextFontSize;
