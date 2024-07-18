/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { withStaticProperties } from '@crossed/core';
import { Text, type TextProps } from '../typography/Text';
import {
  composeStyles,
  createStyles,
  type CrossedMethods,
} from '@crossed/styled';
import { createContext, useContext } from 'react';
import { YBox, type YBoxProps } from '../layout/YBox';
import { match } from 'ts-pattern';
import { AlertTriangle, CheckCircle, Info, XCircle } from '@crossed/unicons';
import {
  Button,
  ButtonText,
  type ButtonProps,
  type ButtonTextProps,
} from '../forms/Button';

export const alertStyles = createStyles(
  ({ components: { Alert }, space, colors }) =>
    ({
      description: {
        base: {
          flex: 1,
        },
        variants: {
          status: {
            error: { base: { color: Alert.error.text } },
            success: { base: { color: Alert.success.text } },
            warning: { base: { color: Alert.warning.text } },
            info: { base: { color: Alert.info.text } },
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
            error: { base: { backgroundColor: colors.error.hight } },
            success: {
              base: {
                // backgroundColor: t.colors.success.hight,
              },
            },
            warning: {
              base: {
                // backgroundColor: t.colors.warning.hight,
              },
            },
            info: {
              base: {
                // backgroundColor: t.colors.info.hight,
              },
            },
          },
        },
      },
      container: {
        base: {
          paddingTop: space.xxs,
          paddingBottom: space.xxs,
          paddingRight: space.xs,
          paddingLeft: space.xs,
          borderRadius: 8,
          borderWidth: 1,
          borderStyle: 'solid',
          alignItems: 'center',
          gap: space.xxs,
        },
        variants: {},
        media: {
          md: {
            flexDirection: 'row',
            gap: space.xs,
          },
        },
      },
      action: {
        web: {
          'base': { boxSizing: 'border-box' },
          ':focus': {
            outlineWidth: '2px',
            outlineOffset: '2px',
            outlineStyle: 'solid',
          },
        },
        variants: {
          status: {
            error: { web: { ':focus': { outlineColor: Alert.error.text } } },
            success: {
              web: { ':focus': { outlineColor: Alert.success.text } },
            },
            warning: {
              web: { ':focus': { outlineColor: Alert.warning.text } },
            },
            info: {
              web: { ':focus': { outlineColor: Alert.info.text } },
            },
          },
        },
      },
      actionText: {
        variants: {
          status: {
            error: {
              'base': { color: Alert.error.text },
              ':hover': { color: Alert.error.text },
              ':active': { color: Alert.error.text },
            },
            success: {
              'base': { color: Alert.success.text },
              ':hover': { color: Alert.success.text },
              ':active': { color: Alert.success.text },
            },
            warning: {
              'base': { color: Alert.warning.text },
              ':hover': { color: Alert.warning.text },
              ':active': { color: Alert.warning.text },
            },
            info: {
              'base': { color: Alert.info.text },
              ':hover': { color: Alert.info.text },
              ':active': { color: Alert.info.text },
            },
          },
        },
      },
      group: { base: { flex: 1 } },
    }) as const
);

const containerStyles = createStyles(({ components: { Alert } }) => ({
  error: {
    base: {
      borderColor: Alert.error.border,
      backgroundColor: Alert.error.background,
    },
  },
  success: {
    base: {
      borderColor: Alert.success.border,
      backgroundColor: Alert.success.background,
    },
  },
  warning: {
    base: {
      borderColor: Alert.warning.border,
      backgroundColor: Alert.warning.background,
    },
  },
  info: {
    base: {
      borderColor: Alert.info.border,
      backgroundColor: Alert.info.background,
    },
  },
}));

type ContainerProps = YBoxProps & { status?: keyof typeof containerStyles };

const alertContext = createContext<Pick<ContainerProps, 'status'>>({});

const Container = ({
  status = 'info',
  children,
  style,
  ...props
}: ContainerProps) => {
  return (
    <alertContext.Provider value={{ status }}>
      <YBox
        space="xs"
        role="alert"
        {...props}
        style={composeStyles(
          alertStyles.container,
          containerStyles[status],
          style
        )}
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
      {...alertStyles.description.rnw({ ...props, variants: { status } })}
    />
  );
};

export type GroupProps = { style?: CrossedMethods<any, any> } & Omit<
  TextProps,
  'style'
>;

const Group = ({ style, ...props }: GroupProps) => {
  const { status } = useContext(alertContext);
  return (
    <YBox
      {...props}
      {...composeStyles(alertStyles.group, style).rnw({
        ...props,
        variants: { status },
      })}
    />
  );
};

const Action = (props: ButtonProps) => {
  const { status } = useContext(alertContext);
  return (
    <Button
      variant="tertiary"
      size={false}
      {...props}
      {...alertStyles.action.rnw({ ...props, variants: { status } })}
    />
  );
};

const ActionText = (props: ButtonTextProps) => {
  const { status } = useContext(alertContext);
  return (
    <ButtonText
      {...props}
      {...alertStyles.actionText.rnw({ ...props, variants: { status } })}
    />
  );
};

const Alert = withStaticProperties(Container, {
  Icon,
  Description,
  Action: withStaticProperties(Action, { Text: ActionText }),
  Group,
});

const {
  Icon: AlertIcon,
  Description: AlertDescription,
  Group: AlertGroup,
} = Alert;

export { Alert, AlertIcon, AlertDescription, AlertGroup };
