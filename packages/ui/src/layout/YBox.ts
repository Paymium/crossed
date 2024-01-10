'use client';

import { View } from 'react-native';
import { styled } from '@crossed/styled';
import { spaceVariants } from '../variants/space';
import type { GetProps } from '@crossed/core';

export const YBox = styled(View, (t) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  alignSelf: "stretch",
  maxWidth: "100%",
  variants: {
    space: {
      xs: { gap: t.space.xs },
      sm: { gap: t.space.sm },
      md: { gap: t.space.md },
      lg: { gap: t.space.lg },
      xl: { gap: t.space.xl },
    },
  },
}));

export type YBoxProps = GetProps<typeof YBox>;
