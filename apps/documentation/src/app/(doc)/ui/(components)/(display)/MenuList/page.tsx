/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import {
  MenuList,
  MenuDivider,
  MenuItem,
  MenuLabel,
  MenuTitle,
  MenuSubTitle,
} from '@crossed/ui';

export default function CreateBadge() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="MenuList"
      description={t('menuList description')}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`// coming soon`}
      example={`
<MenuList>
  <MenuItem>
    <MenuTitle>Home</MenuTitle>
  </MenuItem>
  <MenuDivider/>
  <MenuItem>
    <MenuTitle>Account</MenuTitle>
  </MenuItem>
  <MenuDivider/>
  <MenuItem>
    <MenuTitle>Disconnect</MenuTitle>
  </MenuItem>
</MenuList>`}
      scope={{
        MenuList,
        MenuDivider,
        MenuItem,
        MenuLabel,
        MenuTitle,
        MenuSubTitle,
      }}
    />
  );
}
