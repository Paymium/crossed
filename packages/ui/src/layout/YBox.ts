import { View } from 'react-native';
import { styled } from '@mergeui/core';
import { spaceVariants } from '../variants/space';

export const YBox = styled(View, {
  className: ['flex', 'flex-col'],
  variants: {
    space: spaceVariants,
  },
});
