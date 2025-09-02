/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Text, TextProps } from '../../typography';
import { withDefaultProps } from '@crossed/core';

export const MenuTitle = withDefaultProps(Text, {
  color: 'secondary',
  fontSize: 'sm',
  fontWeight: 'semibold',
});
MenuTitle.displayName = 'MenuList.Title';
