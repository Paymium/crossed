import { Text as TextNative } from 'react-native';
import { styled } from '@mergeui/core';

export const [Heading] = styled(TextNative, {
  className: ['text-black', 'dark:text-white'],
  variants: {
    variant: { link: { className: ['text-blue-500'], props: { as: 'a' } } },
    order: {
      1: { className: ['text-9xl'], props: { as: 'h1' } },
      2: { className: ['text-8xl'], props: { as: 'h2' } },
      3: { className: ['text-7xl'], props: { as: 'h3' } },
      4: { className: ['text-6xl'], props: { as: 'h4' } },
      5: { className: ['text-5xl'], props: { as: 'h5' } },
      6: { className: ['text-4xl'], props: { as: 'h6' } },
    },
  },
  defaultVariants: {
    order: 1,
  },
});
