'use client';

import { View } from 'react-native';
import { styled } from '@crossed/styled';

export const Divider = styled(View, {
  'className': ['flex'],
  'props': { role: 'separator' },
  ':dark': { className: ['border-neutral-800'] },
  ':light': { className: ['border-neutral-200'] },
  'variants': {
    direction: {
      vertical: { className: ['border-l', 'h-full'] },
      horizontal: { className: ['border-t', 'w-full'] },
    },
  },
});
