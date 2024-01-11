'use client';

import { styled } from '@crossed/styled';
import type { GetProps } from '@crossed/core';
import { Box } from './Box';

export const XBox = styled(Box, () => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  width: '100%',
  flexBasis: 'auto',
  variants: {
    center: { true: { alignItems: 'center' } },
  },
}));

export type XBoxProps = GetProps<typeof XBox>;
