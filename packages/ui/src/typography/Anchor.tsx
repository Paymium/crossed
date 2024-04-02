/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withStyle } from '@crossed/styled';
import { Text } from './Text';
import type { GetProps } from '@crossed/core';
import { withDefaultProps } from '@crossed/core';

export const Anchor = withStyle(
  withDefaultProps(Text, {
    variants: {
      color: 'link',
      weight: 'medium',
    },
    role: 'link',
  }),
  {
    theme: (t) => ({
      'base': {
        fontFamily: t.fontFamily,
        textDecorationLine: 'none',
        cursor: 'pointer',
      },
      ':hover': {
        textDecorationLine: 'underline',
        color: t.colors.link,
      },
    }),
  }
  // { name: 'Anchor' }
);

export type AnchorProps = GetProps<typeof Anchor>;
