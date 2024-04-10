/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import { Select, Text } from '@crossed/ui';
import { ChevronDown } from '@crossed/unicons';

export default function CreateBadge() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="Select"
      description={t(
        'Select component is a component that allows users pick a value from predefined options.'
      )}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`// coming soon`}
      example={`
<Select
  defaultValue="en"
>
  <Select.Trigger>
    <Select.Value />
    <ChevronDown />
  </Select.Trigger>
  <Select.Content>
    <Select.Option value="fr">
      <Text>🇫🇷 Français</Text>
    </Select.Option>
    <Select.Option value="en">
      <Text>🇬🇧 Anglais</Text>
    </Select.Option>
  </Select.Content>
</Select>
    `}
      scope={{ Select, ChevronDown, Text }}
    />
  );
}
