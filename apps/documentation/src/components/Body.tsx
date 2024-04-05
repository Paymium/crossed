/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';
import { type HtmlHTMLAttributes } from 'react';

const useBody = createStyles((t) => ({
  body: {
    base: {
      backgroundColor: t.colors.background,
      minHeight: '100%',
      display: 'flex',
    },
  },
}));

export const Body = ({
  style,
  ...props
}: HtmlHTMLAttributes<HTMLBodyElement>) => {
  return <body {...props} {...useBody.body.className({ style })} />;
};
