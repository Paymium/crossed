'use client';

import { View } from 'react-native';
import { GetProps, styled } from '@crossed/styled';
import { spaceVariants } from '../variants';

export const Box = styled(View, {
  className: ['flex'],
  variants: {
    space: spaceVariants,
  },
});

export type BoxProps = GetProps<typeof Box>;
