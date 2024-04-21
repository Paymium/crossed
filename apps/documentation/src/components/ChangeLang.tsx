/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import '@/locales';
import { Select, Text, XBox } from '@crossed/ui';
import { useTranslation } from 'react-i18next';

export const ChangeLang = () => {
  const { i18n } = useTranslation();
  return (
    <Select
      // variant="default"
      // defaultValue="en"
      value={i18n.language}
      onChange={(v) => {
        i18n.changeLanguage(v.toString());
      }}
    >
      <Select.Trigger>
        <Select.Value />
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
  );
};
