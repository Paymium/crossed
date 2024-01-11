'use client';

import { Link } from '@/components/Link';
import '@/types/unistyles';
import { styled } from '@crossed/styled';
import { Center, H2, P } from '@crossed/ui';
import { useTranslation } from 'react-i18next';

const Container = styled(Center, (t) => ({
  minHeight: '85%',
  backgroundColor: t.colors.background,
}));

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
