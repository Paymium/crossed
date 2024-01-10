'use client';

import { View } from 'react-native';
import { styled } from '@crossed/styled';
import { spaceVariants } from '../variants/space';
import type { GetProps } from '@crossed/core';

export const XBox = styled(View, (t) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  width: '100%',
  flexBasis: "auto",
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

export type XBoxProps = GetProps<typeof XBox>;
