/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { withStaticProperties } from '@crossed/core';
import { Text, type TextProps } from '../typography/Text';
import { Button, type ButtonProps } from '../forms/Button';
import { createStyles, type ExtractForProps } from '@crossed/styled';
import { createContext, useContext } from 'react';
import { CheckCircle } from '@crossed/unicons';
import { Box } from '../layout/Box';
import { YBox, type YBoxProps } from '../layout/YBox';

const alertStyles = createStyles(
  (t) =>
    ({
      action: { base: { paddingTop: 4 } },
      description: { base: { color: '#5D607C', flex: 1, paddingTop: 6 } },
      title: {
        variants: {
          status: {
            error: { base: { color: '#A21A1A' } },
            success: { base: { color: '#188551' } },
            warning: { base: { color: '#AD5C23' } },
            info: { base: { color: '#285F9B' } },
          },
        },
      },
      containerTitle: {
        base: { flexDirection: 'row', alignItems: 'center' },
      },
      containerIcon: {
        base: {
          borderRadius: 32,
          width: 32,
          height: 32,
        },
        variants: {
          status: {
            error: { base: { backgroundColor: '#FEC4C4' } },
            success: { base: { backgroundColor: '#DCF6E9' } },
            warning: { base: { backgroundColor: '#FFE0CA' } },
            info: { base: { backgroundColor: '#D1E7FF' } },
          },
        },
      },
      container: {
        base: {
          paddingVertical: t.space.md,
          paddingHorizontal: t.space.xl,
          borderRadius: 8,
          alignItems: 'center',
          borderWidth: 1,
          borderStyle: 'solid',
        },
        variants: {
          status: {
            error: { base: { borderColor: '#EF4444' } },
            success: { base: { borderColor: '#3ABB7D' } },
            warning: { base: { borderColor: '#F97316' } },
            info: { base: { borderColor: '#93C5FD' } },
          },
        },
        media: {
          md: {
            flexDirection: 'row',
            alignItems: 'flex-start',
          },
        },
      },
    } as const)
);

type Variant = ExtractForProps<typeof alertStyles.container>;

type ContainerProps = YBoxProps & Variant['variants'];

const alertContext = createContext<Pick<ContainerProps, 'status'>>({});

const Container = ({ status = 'info', children, ...props }: ContainerProps) => {
  return (
    <alertContext.Provider value={{ status }}>
      <YBox
        space="sm"
        role="alert"
        {...props}
        {...alertStyles.container.rnw({ variants: { status } })}
      >
        {children}
      </YBox>
    </alertContext.Provider>
  );
};

const Icon = () => {};

const Title = (props: TextProps) => {
  const { status } = useContext(alertContext);
  const { color } = alertStyles.title.style({ variants: { status } }).style;
  return (
    <Box space="xl" {...alertStyles.containerTitle.rnw()}>
      <Box center {...alertStyles.containerIcon.rnw({ variants: { status } })}>
        <CheckCircle color={color} size={16} />
      </Box>
      <Text
        weight="semibold"
        numberOfLines={1}
        // ellipsizeMode='middle'
        // lineBreakMode='middle'
        // lineBreakStrategyIOS='standard'
        {...props}
        {...alertStyles.title.rnw({ variants: { status } })}
      />
    </Box>
  );
};
const Description = (props: TextProps) => {
  return <Text {...props} {...alertStyles.description.rnw()} />;
};

const Action = (props: ButtonProps) => {
  return (
    <Button
      variant="tertiary"
      size={false}
      {...props}
      {...alertStyles.action.rnw()}
    />
  );
};

const Alert = withStaticProperties(Container, {
  Icon,
  Title,
  Description,
  Action,
});

const {
  Icon: AlertIcon,
  Title: AlertTitle,
  Description: AlertDescription,
  Action: AlertAction,
} = Alert;

export { Alert, AlertIcon, AlertTitle, AlertDescription, AlertAction };
