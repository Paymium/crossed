import { Text as TextNative } from 'react-native';
import { styled } from '@mergeui/core';

export const [Text] = styled(TextNative, {
  className: ['dark:text-white text-black'],
  variants: {
    variant: { link: { className: ['text-blue-500'] } },
    weight: {
      thin: { className: ['font-thin'] },
      extralight: { className: ['font-extralight'] },
      light: { className: ['font-light'] },
      normal: { className: ['font-normal'] },
      medium: { className: ['font-medium'] },
      semibold: { className: ['font-semibold'] },
      bold: { className: ['font-bold'] },
      extrabold: { className: ['font-extrabold'] },
      black: { className: ['font-black'] },
    },
  },
});
