'use client';

import { Text as TextNative } from 'react-native';
import { styled } from '@crossed/styled';
import { H1, H2, H3, H4, H5, H6 } from '@expo/html-elements';

export const Heading = styled(TextNative, {
  'className': ['text-white', 'my-0'],
  'variants': {
    variant: { link: { className: ['text-blue-500'], props: { as: 'a' } } },
    order: {
      1: { className: ['text-5xl font-bold'], props: { as: H1 } },
      2: { className: ['text-4xl'], props: { as: H2 } },
      3: { className: ['text-3xl'], props: { as: H3 } },
      4: { className: ['text-2xl'], props: { as: H4 } },
      5: { className: ['text-xl'], props: { as: H5 } },
      6: { className: ['text-base'], props: { as: H6 } },
    },
  },
  'defaultVariants': {
    order: 1,
  },
});
