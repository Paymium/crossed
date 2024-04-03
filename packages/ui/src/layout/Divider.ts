/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { View } from 'react-native';
import { withStyle } from '@crossed/styled';
import { withDefaultProps } from '@crossed/core';

export const Divider = withStyle(
  withDefaultProps(View, { role: 'separator' }),
  (t) => ({
    base: {
      borderWidth: 0,
      borderStyle: 'solid',
      borderColor: t.colors.neutral,
    },
    variants: {
      direction: {
        vertical: {
          base: {
            borderLeftWidth: 1,
            height: '100%',
          },
        },
        horizontal: {
          base: {
            borderTopWidth: 1,
            width: '100%',
          },
        },
      },
    },
  })
);
