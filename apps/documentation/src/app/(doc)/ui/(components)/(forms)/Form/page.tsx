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
  Form,
  FormControl,
  FormField,
  FormLabel,
  Input,
  Select,
  Text,
  XBox,
} from '@crossed/ui';
import { ChevronDown } from '@crossed/unicons';

export default function CreateBadge() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="Form"
      description={t('// coming soon')}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`// coming soon`}
      example={`
<Form>
  <FormField>
    <FormLabel>Label</FormLabel>
    <FormControl><Input /></FormControl>
  </FormField>
  <FormField>
    <FormLabel>Label</FormLabel>
    <FormControl>
      <Select>
        <Select.Trigger>
          <XBox alignItems="center" justifyContent="between">
            <Select.Value />
          </XBox>
        </Select.Trigger>
        <Select.Content>
          <Select.Option value="fr">
            <Text>🇫🇷 Français</Text>
          </Select.Option>
          <Select.Option value="en">
            <Text>🇬🇧 Anglais</Text>
          </Select.Option>
          <Select.Option value="de">
            <Text>🇬🇧 Anglais</Text>
          </Select.Option>
        </Select.Content>
      </Select>
    </FormControl>
  </FormField>
</Form>
`}
      scope={{
        Form,
        FormControl,
        FormLabel,
        FormField,
        Input,
        Select,
        ChevronDown,
        XBox,
        Text,
      }}
    />
  );
}
