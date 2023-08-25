import { View } from 'react-native';
import { styled } from '@crossed/core';
import { spaceVariants } from '../variants/space';

export const YBox = styled(View, {
  className: ['flex', 'flex-col', 'items-start', 'w-full'],
  variants: {
    space: spaceVariants,
  },
});
