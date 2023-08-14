import { View } from 'react-native';
import { styled } from '@crossed/core';
import { spaceVariants } from '../variants';

export const Box = styled(View, {
  className: ['flex'],
  variants: {
    space: spaceVariants,
  },
});
