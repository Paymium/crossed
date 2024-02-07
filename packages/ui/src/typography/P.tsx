/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { forwardRef } from 'react';
import { Text, type TextProps } from './Text';
import { withStyle } from '@crossed/styled';

export const P = withStyle(
  forwardRef((props: Omit<TextProps, 'role'>, ref) => (
    <Text role="paragraph" {...props} ref={ref} />
  )),
  (t) => ({
    base: {
      alignSelf: 'stretch',
      marginVertical: t.space.md,
    },
  })
);
