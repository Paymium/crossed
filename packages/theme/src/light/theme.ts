/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { space } from '../space';
import type { Theme } from '../types/theme';
import colors from './colors';
import { font } from '../font';
import { radius } from '../radius';

export default {
  colors: colors,
  space,
  radius,
  font: font,
} as const satisfies Theme;
