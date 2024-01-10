'use client';

import { Text } from '@crossed/ui';
import { useTranslation } from 'react-i18next';

export const ChangeLang = () => {
  const { i18n } = useTranslation();
  return (
    <Text
      onPress={() => {
        i18n.changeLanguage('fr');
      }}
    >
      ChangeLang
    </Text>
  );
};
