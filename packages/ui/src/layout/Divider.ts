import { View } from 'react-native';
import { styled } from '@mergeui/core';

export const Divider = styled(View, {
  base: {
    styles: ["flex", "border-zinc-600"]
  },
  variants: {
    direction: {
      vertical: ["border-l", "h-full"],
      horizontal: ["border-t", "w-full"],
    }
  }
});
