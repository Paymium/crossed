import { View } from 'react-native';
import { styled } from '@crossed/styled';
import { spaceVariants } from '../variants/space';

export const XBox = styled(View, {
  className: ['flex', 'flex-row', 'w-full'],
  variants: {
    space: spaceVariants,
  },
});
