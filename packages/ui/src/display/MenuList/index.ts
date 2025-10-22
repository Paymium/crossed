/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withStaticProperties } from '@crossed/core';
import { MenuRoot } from './Root';
import { MenuDivider } from './Divider';
import { MenuLabel } from './Label';
import { MenuTitle } from './Title';
import { MenuItem } from './Item';
import { MenuListIcon } from './Icon';

export const MenuList = withStaticProperties(MenuRoot, {
  Divider: MenuDivider,
  Item: MenuItem,
  Label: MenuLabel,
  Title: MenuTitle,
  Icon: MenuListIcon,
});
