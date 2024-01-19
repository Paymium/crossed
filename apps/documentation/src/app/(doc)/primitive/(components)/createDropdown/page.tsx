/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { TemplatePrimitive } from '../templatePrimitive';
import { useTranslation } from 'react-i18next';

export default function CreateDropdown() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="createDropdown"
      description={t('Creation primitive Dropdown')}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`
import { createDropdown } from "@crossed/primitive";

const Dropdown = createDropdown({
  Root,
  Trigger,
  Content,
  Portal,
  Item,
  Divider,
  Label,
})`}
      example={`
import { createDropdown } from "@crossed/primitive";

const Dropdown = createDropdown({
  Root,
  Trigger,
  Content,
  Portal,
  Item,
  Divider,
  Label,
})`}
    />
  );
}
