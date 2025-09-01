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
  xxl: { base: { gap: space['2xl'] } },
}));
