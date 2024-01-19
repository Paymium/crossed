/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { withDefaultProps, withStaticProperties } from '@crossed/core';
import { styled } from '@crossed/styled';
import { Text } from '../typography/Text';
import { XBox } from '../layout/XBox';

const Container = withDefaultProps(
  styled(XBox, (t) => ({
    padding: t.space.md,
    borderRadius: 4,
    variants: {
      status: {
        error: { backgroundColor: t.colors.error },
        success: { backgroundColor: t.colors.success },
        warning: { backgroundColor: t.colors.warning },
        info: { backgroundColor: t.colors.info },
      },
    },
  })),
  { space: undefined }
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
