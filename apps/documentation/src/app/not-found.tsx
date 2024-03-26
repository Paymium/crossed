/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { Link } from '@/components/Link';
import { withStyle } from '@crossed/styled';
import { Center, H2, P } from '@crossed/ui';
import { useTranslation } from 'react-i18next';

const Container = withStyle(Center, {
  theme: (t) => ({
    base: {
      minHeight: '85%',
      backgroundColor: t.colors.background,
    },
  }),
});

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <Container>
      <H2>{t('Not Found')}</H2>
      <P textAlign="center">{t('Could not find requested resource')}</P>
      <Link href="/">{t('Return Home')}</Link>
    </Container>
  );
}
