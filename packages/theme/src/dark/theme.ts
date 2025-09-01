/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { space } from '../space';
import colors from './colors';
import { font } from '../font';
import type { Theme } from '../types/theme';
import { radius } from '../radius';

export default {
  colors: colors,
  space,
  radius,
  font: { ...font, color: 'white' },
} as const satisfies Theme;
