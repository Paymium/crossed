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
  base: {
    display: 'flex',
    variants: {
      space: {
        xs: { gap: t.space.xs },
        sm: { gap: t.space.sm },
        md: { gap: t.space.md },
        lg: { gap: t.space.lg },
        xl: { gap: t.space.xl },
      },
      center: { true: { alignItems: 'center' } },
    },
  },
}));

export type BoxProps = GetProps<typeof Box>;
