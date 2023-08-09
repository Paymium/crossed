import { Text as TextNative } from 'react-native';
import { styled } from '@mergeui/core';

export const [Heading] = styled(TextNative, {
  base: {
    styles: ['text-black', 'dark:text-white'],
  },
  variants: {
    variant: { link: { styles: ['text-blue-500'], props: { as: 'a' } } },
    order: {
      1: { styles: ['text-9xl'], props: { as: 'h1' } },
      2: { styles: ['text-8xl'], props: { as: 'h2' } },
      3: { styles: ['text-7xl'], props: { as: 'h3' } },
      4: { styles: ['text-6xl'], props: { as: 'h4' } },
      5: { styles: ['text-5xl'], props: { as: 'h5' } },
      6: { styles: ['text-4xl'], props: { as: 'h6' } },
    },
  } as const,
  defaultVariants: {
    order: 1,
  },
});
