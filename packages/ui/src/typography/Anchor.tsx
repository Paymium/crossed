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

export const Anchor = withDefaultProps(
  withStyle(
    Text,
    (t) => ({
      base: {
        'fontFamily': t.fontFamily,
        'textDecorationLine': 'none',
        'cursor': 'pointer',
        'hover:': {
          textDecorationLine: 'underline',
          color: t.utils.shadeColor(t.colors.link, 45),
        },
      },
    })
    // { name: 'Anchor' }
  ),
  { weight: 'medium', role: 'link', color: 'link' }
);

export type AnchorProps = GetProps<typeof Anchor>;
