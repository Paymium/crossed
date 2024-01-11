'use client';
import { H1, YBox } from '@crossed/ui';
import { useTranslation } from 'react-i18next';

export default function RouterPage() {
  const { t } = useTranslation();
  return (
    <YBox role="main">
      <H1>{t('Introduction')}</H1>
    </YBox>
  );
}
