/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Text } from './Text';
import { withStyle } from '@crossed/styled';
import type { GetProps } from '@crossed/core';

export const I = withStyle(Text, () => ({
  base: {
    fontStyle: 'italic',
  },
}));

export type IProps = GetProps<typeof I>;
