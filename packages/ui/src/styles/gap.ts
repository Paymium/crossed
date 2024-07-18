/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const gapStyles = createStyles((t) => ({
  xxs: { base: { gap: t.space.xxs } },
  xs: { base: { gap: t.space.xs } },
  sm: { base: { gap: t.space.sm } },
  md: { base: { gap: t.space.md } },
  lg: { base: { gap: t.space.lg } },
  xl: { base: { gap: t.space.xl } },
  xxl: { base: { gap: t.space.xxl } },
}));
