/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { BorderRadius } from './types/borderRadius';

export const borderRadius = {
  'none': 0,
  'xxs': 2,
  'xs': 4,
  'sm': 6,
  'md': 8,
  'lg': 10,
  'xl': 12,
  '2xl': 16,
  '3xl': 20,
  '4xl': 24,
  'full': 9999, // pas convaincu de cette valeur
} as const satisfies BorderRadius;
