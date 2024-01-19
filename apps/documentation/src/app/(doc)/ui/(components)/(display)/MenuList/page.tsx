/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import { MenuList } from '@crossed/ui';

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
  <MenuList.Label>Label</MenuList.Label>
  <MenuList.Item>
    <MenuList.Title>Home</MenuList.Title>
  </MenuList.Item>
  <MenuList.Divider/>
  <MenuList.Item>
    <MenuList.Title>Account</MenuList.Title>
  </MenuList.Item>
  <MenuList.Divider/>
  <MenuList.Item>
    <MenuList.Title>Disconnect</MenuList.Title>
  </MenuList.Item>
</MenuList>`}
      scope={{
        MenuList,
      }}
    />
  );
}
