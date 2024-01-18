'use client';

import { styled } from '@crossed/styled';
import { Text, TextProps } from './Text';
import { withDefaultProps } from '@crossed/core';

type HeadingProps = TextProps & { 'aria-level'?: number };

export const H1 = withDefaultProps<HeadingProps>(Text, {
  'role': 'heading',
  'aria-level': 1,
  'size': '5xl',
  'weight': 'bold',
});

export const H2 = styled(
  withDefaultProps<HeadingProps>(Text, {
    'role': 'heading',
    'aria-level': 2,
    'size': '4xl',
    'weight': 'semibold',
  }),
  (t) => ({ marginTop: t.space.xl, marginBottom: t.space.md })
);
export const H3 = withDefaultProps<HeadingProps>(Text, {
  'role': 'heading',
  'aria-level': 3,
  'size': '3xl',
});
export const H4 = styled(
  withDefaultProps<HeadingProps>(Text, {
    'role': 'heading',
    'aria-level': 4,
    'size': '2xl',
  }),
  { marginTop: 20 }
);
export const H5 = withDefaultProps<HeadingProps>(Text, {
  'role': 'heading',
  'aria-level': 5,
  'size': 'xl',
});
export const H6 = withDefaultProps<HeadingProps>(Text, {
  'role': 'heading',
  'aria-level': 6,
  'size': 'lg',
});
