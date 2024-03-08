/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { withDefaultProps, withStaticProperties } from '@crossed/core';
import { withStyle } from '@crossed/styled';
import { Text } from '../typography/Text';
import { XBox } from '../layout/XBox';

const Container = withStyle(
  withDefaultProps(XBox, { space: undefined }),
  ({ theme: t }) => ({
    base: {
      padding: t.space.md,
      borderRadius: 4,
      alignItems: 'flex-start',
    },
    variants: {
      status: {
        error: { base: { backgroundColor: t.colors.error } },
        success: { base: { backgroundColor: t.colors.success } },
        warning: { base: { backgroundColor: t.colors.warning } },
        info: { base: { backgroundColor: t.colors.info } },
      },
    },
  })
);

const Icon = () => {};

const Title = withDefaultProps(Text, { weight: 'bold', size: 'lg' });
const Description = Text;

const Alert = withStaticProperties(Container, {
  Icon,
  Title,
  Description,
});

const {
  Icon: AlertIcon,
  Title: AlertTitle,
  Description: AlertDescription,
} = Alert;

export { Alert, AlertIcon, AlertTitle, AlertDescription };
