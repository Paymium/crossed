'use client';

import { View } from 'react-native';
import { GetProps, styled } from '@crossed/styled';
import { spaceVariants } from '../variants/space';

export const YBox = styled(View, {
  className: ['flex', 'flex-col', 'items-start'],
  variants: {
    space: spaceVariants,
  },
});

export type YBoxProps = GetProps<typeof YBox>;
