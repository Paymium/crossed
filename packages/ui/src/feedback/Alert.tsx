'use client';
import {
  GetProps,
  createScope,
  withDefaultProps,
  withStaticProperties,
} from '@crossed/core';
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

type ContainerProps = GetProps<typeof Container>;

type AlertContext = {
  status: ContainerProps['status'];
};

const [AlertProvider, useAlertContext] = createScope<AlertContext>({
  status: 'info',
});

const AlertRoot = ({ status = 'info', ...props }: ContainerProps) => {
  return (
    <AlertProvider status={status}>
      <Container status={status} {...props} />
    </AlertProvider>
  );
};

const Icon = () => {};

const Title = withDefaultProps(Text, { weight: 'bold', size: 'lg' });
const Description = Text;

const Alert = withStaticProperties(AlertRoot, {
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
