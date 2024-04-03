/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { Text, XBox, YBox } from '@crossed/ui';
import { Link } from './Link';
import { withStyle } from '@crossed/styled';
import { withDefaultProps } from '@crossed/core';
import { useTranslation } from 'react-i18next';

const Container = withStyle(YBox, (t) => ({
  base: {
    backgroundColor: t.colors.backgroundStrong,
    padding: 15,
    justifyContent: 'center',
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: t.colors.neutral,
    alignItems: 'center',
  },
}));

const Row = withStyle(withDefaultProps(XBox, { space: 'sm' }), () => ({
  base: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

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
