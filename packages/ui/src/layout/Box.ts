/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { View } from 'react-native';
import { withStyle } from '@crossed/styled';
import type { GetProps } from '@crossed/core';

export const Box = withStyle(View, (t) => ({
  base: { display: 'flex' },
  web: { boxSizing: 'border-box' },
  variants: {
    space: {
      xs: { base: { gap: t.space.xs } },
      sm: { base: { gap: t.space.sm } },
      md: { base: { gap: t.space.md } },
      lg: { base: { gap: t.space.lg } },
      xl: { base: { gap: t.space.xl } },
    },
    center: { true: { base: { alignItems: 'center' } } },
  },
}));

export type BoxProps = GetProps<typeof Box>;
