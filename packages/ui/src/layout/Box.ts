'use client';

import { View } from 'react-native';
import type { GetProps } from '@crossed/styled';
import { styled } from '@crossed/styled';
import { spaceVariants } from '../variants';

export const Box = styled(View, {
  className: ['flex'],
  variants: {
    space: spaceVariants,
  },
});

export type BoxProps = GetProps<typeof Box>;
