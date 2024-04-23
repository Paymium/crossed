/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { withStaticProperties } from '@crossed/core';
import { Text, type TextProps } from '../typography/Text';
import { createStyles, type ExtractForProps } from '@crossed/styled';
import { createContext, useContext } from 'react';
import { YBox, type YBoxProps } from '../layout/YBox';
import { match } from 'ts-pattern';
import { AlertTriangle, CheckCircle, Info, XCircle } from '@crossed/unicons';

const alertStyles = createStyles(
  (t) =>
    ({
      description: {
        base: { color: t.colors.neutral[600], flex: 1 },
        variants: {
          status: {
            error: { base: { color: t.colors.error.satured } },
            success: { base: { color: t.colors.success.satured } },
            warning: { base: { color: t.colors.warning.satured } },
            info: { base: { color: t.colors.info.satured } },
          },
        },
      },
      containerIcon: {
        base: {
          borderRadius: 32,
          width: 32,
          height: 32,
        },
        variants: {
          status: {
            error: { base: { backgroundColor: t.colors.error.hight } },
            success: { base: { backgroundColor: t.colors.success.hight } },
            warning: { base: { backgroundColor: t.colors.warning.hight } },
            info: { base: { backgroundColor: t.colors.info.hight } },
          },
        },
      },
      container: {
        base: {
          padding: t.space.xxs,
          paddingVertical: t.space.xxs,
          paddingHorizontal: t.space.xs,
          borderRadius: 8,
          alignItems: 'center',
          borderWidth: 1,
          borderStyle: 'solid',
          flexDirection: 'row',
        },
        variants: {
          status: {
            error: {
              base: {
                borderColor: t.colors.error.bright,
                backgroundColor: t.colors.error.low,
              },
            },
            success: {
              base: {
                borderColor: t.colors.success.bright,
                backgroundColor: t.colors.success.low,
              },
            },
            warning: {
              base: {
                borderColor: t.colors.warning.bright,
                backgroundColor: t.colors.warning.low,
              },
            },
            info: {
              base: {
                borderColor: t.colors.info.bright,
                backgroundColor: t.colors.info.low,
              },
            },
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
        space="xs"
        role="alert"
        {...props}
        {...alertStyles.container.rnw({ variants: { status } })}
      >
        {children}
      </YBox>
    </alertContext.Provider>
  );
};

const Icon = () => {
  const { status } = useContext(alertContext);
  const { color } = alertStyles.description.style({
    variants: { status },
  }).style;
  const Comp = match(status)
    .with('error', () => XCircle)
    .with('info', () => Info)
    .with('success', () => CheckCircle)
    .with('warning', () => AlertTriangle)
    .exhaustive();
  return <Comp color={color} size={16} />;
};

const Description = (props: TextProps) => {
  const { status } = useContext(alertContext);
  return (
    <Text
      {...props}
      {...alertStyles.description.rnw({ variants: { status } })}
    />
  );
};

const Alert = withStaticProperties(Container, {
  Icon,
  Description,
});

const { Icon: AlertIcon, Description: AlertDescription } = Alert;

export { Alert, AlertIcon, AlertDescription };
