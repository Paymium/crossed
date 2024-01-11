'use client';

import { styled } from '@crossed/styled';
import type { GetProps } from '@crossed/core';
import { Box } from './Box';

export const YBox = styled(Box, () => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  alignSelf: 'stretch',
  maxWidth: '100%',
}));

export type YBoxProps = GetProps<typeof YBox>;
