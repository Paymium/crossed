/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { withStyle } from '@crossed/styled';
import { Text, TextProps } from './Text';
import { withDefaultProps } from '@crossed/core';

type HeadingProps = TextProps & { 'aria-level'?: number };

export const H1 = withDefaultProps<HeadingProps>(Text, {
  'role': 'heading',
  'aria-level': 1,
  'size': '5xl',
  'weight': 'bold',
});

export const H2 = withDefaultProps<HeadingProps>(
  withStyle(Text, ({ theme: t }) => ({
    base: { marginTop: t.space.xl, marginBottom: t.space.md },
  })),
  {
    'role': 'heading',
    'aria-level': 2,
    'size': '4xl',
    'weight': 'semibold',
  }
);

export const H3 = withDefaultProps<HeadingProps>(Text, {
  'role': 'heading',
  'aria-level': 3,
  'size': '3xl',
});
export const H4 = withDefaultProps<HeadingProps>(Text, {
  'role': 'heading',
  'aria-level': 4,
  'size': '2xl',
});
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
