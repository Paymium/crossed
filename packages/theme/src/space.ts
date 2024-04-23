/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Spaces } from './types/space';

export const space = {
  xxs: 8,
  xs: 16,
  sm: 24,
  md: 32,
  lg: 40,
  xl: 56,
  xxl: 72,
} as const satisfies Spaces;
