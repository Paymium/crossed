/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { Text, XBox, YBox } from '@crossed/ui';
import { Link } from './Link';
import { useTranslation } from 'react-i18next';
import { createStyles } from '@crossed/styled';

const useStyles = createStyles((t) => ({
  container: {
    base: {
      backgroundColor: t.colors.backgroundStrong,
      padding: 15,
      justifyContent: 'center',
      borderTopWidth: 1,
      borderStyle: 'solid',
      borderColor: t.colors.neutral,
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
    <YBox space="xs" role="contentinfo" {...useStyles.container.style()}>
      <XBox {...useStyles.row.style()}>
        <Text size="xs">Copyright © {new Date().getFullYear()}</Text>
        <Link href="https://paymium.com" target="_blank">
          Paymium
        </Link>
      </XBox>
      <Text size="xxs">{t('Made with crossed ecosystem')}</Text>
    </YBox>
  );
};
