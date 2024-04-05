/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { withDefaultProps, withStaticProperties } from '@crossed/core';
import { Text } from '../typography/Text';
import { XBox, type XBoxProps } from '../layout/XBox';
import { createStyles, type ExtractForProps } from '@crossed/styled';

const useAlert = createStyles((t) => ({
  container: {
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
  },
}));

type Variant = ExtractForProps<typeof useAlert>;

type ContainerProps = XBoxProps & Variant['variants'];

const Container = ({ status, ...props }: ContainerProps) => {
  const { container } = useAlert({ variants: { status } });
  return <XBox space={undefined} {...props} {...container} />;
};

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
