/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withStyle } from '@crossed/styled';
import { Text } from './Text';
import { forwardRef, memo } from 'react';
import { XBox, XBoxProps } from '../layout/XBox';
import { YBox } from '../layout/YBox';
import { withDefaultProps } from '@crossed/core';

export const Ul = withStyle(
  withDefaultProps(YBox, { role: 'list' }),
  ({ theme: t }) => ({
    base: {
      marginTop: t.space.xl,
    },
  })
);

export const Li = withStyle(
  memo(
    forwardRef(({ children, ...props }: Omit<XBoxProps, 'role'>, ref: any) => (
      <XBox {...props} ref={ref} role="listitem">
        <Disc />
        {children as any}
      </XBox>
    ))
  ),
  ({ theme: t }) => ({ base: { gap: t.space.md, marginBottom: t.space.md } })
);

export const Disc = withStyle(
  withDefaultProps(Text, { children: '\u2B24' + ' ' }),
  { base: { fontSize: 9 } }
);
