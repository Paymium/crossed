import { Text as TextNative } from 'react-native';
import { styled } from '@mergeui/core';

export const Heading = styled(TextNative, {
  base: {
    styles: ['text-black', 'dark:text-white'],
    props: {
      as: 'h1',
    },
  },
  variants: {
    variant: { link: ['text-blue-500'] },
    order: {
      1: ["text-9xl"],
      2: ["text-8xl"],
      3: ["text-7xl"],
      4: ["text-6xl"],
      5: ["text-5xl"],
      6: ["text-4xl"],
    },
  } as const,
  defaultVariants: {
    order: 1,
  },
});
