'use client';

import { View } from 'react-native';
import { styled } from '@crossed/styled';

export const Divider = styled(View, {
  className: ['flex', 'border-neutral-200', 'dark:border-neutral-800'],
  props: { role: 'separator' },
  variants: {
    direction: {
      vertical: { className: ['border-l', 'h-full'] },
      horizontal: { className: ['border-t', 'w-full'] },
    },
  },
});
