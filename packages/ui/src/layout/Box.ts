'use client';

import { View } from 'react-native';
import { styled } from '@crossed/styled';
import type { GetProps } from '@crossed/core';

export const Box = styled(View, (t) => ({
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
}));

export type BoxProps = GetProps<typeof Box>;
