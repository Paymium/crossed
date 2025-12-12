/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const gapStyles = createStyles(({ space }) => ({
  xxs: { base: { gap: space.xxs } },
  xs: { base: { gap: space.xs } },
  sm: { base: { gap: space.sm } },
  md: { base: { gap: space.md } },
  lg: { base: { gap: space.lg } },
  xl: { base: { gap: space.xl } },
  xxl: { base: { gap: space.xxl } },
  '3xl': { base: { gap: space['3xl'] } },
  '4xl': { base: { gap: space['4xl'] } },
  '5xl': { base: { gap: space['5xl'] } },
  '6xl': { base: { gap: space['6xl'] } },
  '7xl': { base: { gap: space['7xl'] } },
  '8xl': { base: { gap: space['8xl'] } },
  '9xl': { base: { gap: space['9xl'] } },
  '10xl': { base: { gap: space['10xl'] } },
  '11xl': { base: { gap: space['11xl'] } },
}));
