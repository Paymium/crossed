/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import '@/style.config';
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
