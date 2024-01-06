'use client';

import { View } from 'react-native';
import { styled } from '@crossed/styled';
import { spaceVariants } from '../variants/space';

export const XBox = styled(View, {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  variants: {
    space: spaceVariants,
    center: { true: { alignItems: 'center' } },
  },
});
