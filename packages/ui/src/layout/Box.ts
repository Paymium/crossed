'use client';

import { View } from 'react-native';
import { styled } from '@crossed/styled';
import { spaceVariants } from '../variants';

export const Box = styled(View, {
  className: ['flex'],
  variants: {
    space: spaceVariants,
  },
});
