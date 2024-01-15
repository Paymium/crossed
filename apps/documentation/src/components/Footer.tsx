'use client';

import { Text, XBox, YBox } from '@crossed/ui';
import { Link } from './Link';
import { styled } from '@crossed/styled';
import { withDefaultProps } from '@crossed/core';
import { useTranslation } from 'react-i18next';

const Container = styled(YBox, (t) => ({
  backgroundColor: t.colors.backgroundStrong,
  padding: 15,
  justifyContent: 'center',
  borderTopWidth: 1,
  borderColor: t.colors.borderColor,
  alignItems: 'center',
}));

const Row = withDefaultProps(
  styled(XBox, {
    justifyContent: 'center',
    alignItems: 'center',
  }),
  { space: 'sm' }
);

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <Container space="xs" role="contentinfo">
      <Row>
        <Text size="xs">Copyright © {new Date().getFullYear()}</Text>
        <Link href="https://paymium.com" target="_blank">
          Paymium
        </Link>
      </Row>
      <Text size="xxs">{t('Made with crossed ecosystem')}</Text>
    </Container>
  );
};
