/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import '@/style.config';
import { Text, XBox, YBox } from '@crossed/ui';
import { Link } from './Link';
import { useTranslation } from 'react-i18next';
import { createStyles } from '@crossed/styled';

const useStyles = createStyles((t) => ({
  container: {
    base: {
      backgroundColor: t.colors.neutral['100'],
      padding: 15,
      justifyContent: 'center',
      borderTopWidth: 1,
      borderStyle: 'solid',
      borderColor: t.colors.neutral.hight,
      alignItems: 'center',
    },
  },
  row: {
    base: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
}));

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <YBox space="xs" role="contentinfo" {...useStyles.container.rnw()}>
      <XBox {...useStyles.row.rnw()}>
        <Text size="sm">Copyright © {new Date().getFullYear()}</Text>
        <Link size="sm" href="https://paymium.com" target="_blank">
          Paymium
        </Link>
      </XBox>
      <Text size="sm">{t('Made with crossed ecosystem')}</Text>
    </YBox>
  );
};
