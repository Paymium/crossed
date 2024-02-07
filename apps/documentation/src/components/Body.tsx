/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { withStyle } from '@crossed/styled';
import { HtmlHTMLAttributes, memo } from 'react';

export const Body = withStyle(
  memo((props: HtmlHTMLAttributes<HTMLBodyElement>) => <body {...props} />),
  (t) => ({ base: { backgroundColor: t?.colors?.background } })
  // { name: 'Body', debug: true }
);
