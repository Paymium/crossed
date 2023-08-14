import { View } from 'react-native';
import { styled } from '@crossed/core';

export const Divider = styled(View, {
  className: ['flex', 'border-zinc-600'],
  variants: {
    direction: {
      vertical: { className: ['border-l', 'h-full'] },
      horizontal: { className: ['border-t', 'w-full'] },
    },
  },
});
