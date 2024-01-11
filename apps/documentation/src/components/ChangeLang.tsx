'use client';

import { Select, Text } from '@crossed/ui';
import { useTranslation } from 'react-i18next';

export const ChangeLang = () => {
  const { i18n } = useTranslation();
  return (
    <Select
      defaultValue="en"
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
