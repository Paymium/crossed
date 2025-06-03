/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { HeadLineFontSize } from '../types/font';

export const headLineFontSize = {
  'xs': { lineHeight: 32, fontSize: 24 },
  'sm': { lineHeight: 38, fontSize: 30 },
  'md': { lineHeight: 44, fontSize: 36 },
  'lg': { lineHeight: 60, fontSize: 48 },
  'xl': { lineHeight: 72, fontSize: 60 },
  '2xl': { lineHeight: 90, fontSize: 72 },
} as const satisfies HeadLineFontSize;
