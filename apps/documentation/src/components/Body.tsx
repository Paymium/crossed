/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withStyle } from '@crossed/styled';
import { HtmlHTMLAttributes, memo } from 'react';

export const Body = withStyle(
  memo(({ style, ...props }: HtmlHTMLAttributes<HTMLBodyElement>) => (
    <body {...props} />
  )),
  {
    theme: (t) => ({
      base: {
        backgroundColor: t.colors.background,
        minHeight: '100%',
        display: 'flex',
      },
    }),
  }
);
