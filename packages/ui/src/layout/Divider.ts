'use client';

import { View } from 'react-native';
import { styled } from '@crossed/styled';
import { withDefaultProps } from '@crossed/core';

export const Divider = withDefaultProps(
  styled(View, (t) => ({
    borderWidth: 0,
    borderColor: t.colors.borderColor,
    variants: {
      direction: {
        vertical: {
          borderLeftWidth: 1,
          height: '100%',
        },
        horizontal: {
          borderTopWidth: 1,
          width: '100%',
        },
      },
    },
  })),
  { role: 'separator' }
);
