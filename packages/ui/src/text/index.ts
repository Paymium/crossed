import { Text as TextNative } from 'react-native';
import { styled } from '@mergeui/core';

export const Text = styled(TextNative, {
  base: {
    styles: ["text-blue-500"]
  },
  variants: {
    variant: { link: { styles: ['text-blue-500'] } },
    // weight: {
    //   thin: ['font-thin'],
    //   extralight: ['font-extralight'],
    //   light: ['font-light'],
    //   normal: ['font-normal'],
    //   medium: ['font-medium'],
    //   semibold: ['font-semibold'],
    //   bold: ['font-bold'],
    //   extrabold: ['font-extrabold'],
    //   black: ['font-black'],
    // },
  } as const,
});
