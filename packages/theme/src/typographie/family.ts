/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { FontFamily } from '../types/font';

export const fontFamily = {
  'regular': { fontFamily: 'Inter-Regular' },
  'medium': { fontFamily: 'Inter-Medium' },
  'semibold': { fontFamily: 'Inter-Semibold' },
  'bold': { fontFamily: 'Inter-Bold' },
} as const satisfies FontFamily;
