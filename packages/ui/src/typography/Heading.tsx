/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { Text, type TextProps } from './Text';
import { withDefaultProps } from '@crossed/core';

type HeadingProps = TextProps & { 'aria-level'?: number };

export const H1 = withDefaultProps<HeadingProps>(Text, {
  'role': 'heading',
  'aria-level': 1,
  'size': 'h1',
  'weight': 'bold',
});

export const H2 = withDefaultProps<HeadingProps>(Text, {
  'role': 'heading',
  'aria-level': 2,
  'size': 'h2',
  'weight': 'semibold',
});

export const H3 = withDefaultProps<HeadingProps>(Text, {
  'role': 'heading',
  'aria-level': 3,
  'size': 'h3',
});
export const H4 = withDefaultProps<HeadingProps>(Text, {
  'role': 'heading',
  'aria-level': 4,
  'size': 'h4',
});
export const H5 = withDefaultProps<HeadingProps>(Text, {
  'role': 'heading',
  'aria-level': 5,
  'size': 'h5',
});
export const H6 = withDefaultProps<HeadingProps>(Text, {
  'role': 'heading',
  'aria-level': 6,
  'size': 'h6',
});
