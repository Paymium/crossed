/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Text } from './Text';
import { withStyle } from '@crossed/styled';
import { withDefaultProps } from '@crossed/core';

export const P = withStyle(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore error un react-native, work for web
  withDefaultProps(Text, { role: 'paragraph' }),
  {
    theme: (t) => ({
      base: {
        alignSelf: 'stretch',
        marginVertical: t.space.md,
      },
    }),
  }
);
