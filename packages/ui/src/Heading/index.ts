import { Text as TextNative } from 'react-native';
import { styled } from '@mergeui/core';

export const [Heading] = styled(TextNative, {
  base: {
    styles: [],
  },
  variants: {
    variant: { link: { styles: ['text-blue-500'] } },
    weight: {
      thin: { styles: ['font-thin'] },
      extralight: { styles: ['font-extralight'] },
      light: { styles: ['font-light'] },
      normal: { styles: ['font-normal'] },
      medium: { styles: ['font-medium'] },
      semibold: { styles: ['font-semibold'] },
      bold: { styles: ['font-bold'] },
      extrabold: { styles: ['font-extrabold'] },
      black: { styles: ['font-black'] },
    },
  } as const,
});
