import { Text as TextNative } from 'react-native';
import { styled } from '@mergeui/core';

export const Text = styled(TextNative, '', {
  variants: {
    variant: { link: ['text-blue-500'] },
    weight: {
      thin: ['font-thin'],
      extralight: ['font-extralight'],
      light: ['font-light'],
      normal: ['font-normal'],
      medium: ['font-medium'],
      semibold: ['font-semibold'],
      bold: ['font-bold'],
      extrabold: ['font-extrabold'],
      black: ['font-black'],
    },
  } as const,
});
