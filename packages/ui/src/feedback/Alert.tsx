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
import { ComponentType, createContext, useContext } from 'react';
import { YBox, type YBoxProps } from '../layout/YBox';
import { match } from 'ts-pattern';
import { AlertTriangle, CheckCircle, Info, XCircle } from '@crossed/unicons';
import {
  Button,
  ButtonText,
  type ButtonProps,
  type ButtonTextProps,
} from '../forms/Button';
import { Box } from '../layout/Box';

export const alertDescriptionStyles = createStyles(
  ({ components: { Alert } }) => ({
    base: { base: { flex: 1 } },
    error: { base: { color: Alert.error.text } },
    success: { base: { color: Alert.success.text } },
    warning: { base: { color: Alert.warning.text } },
    info: { base: { color: Alert.info.text } },
  })
);
export const alertActionTextStyles = createStyles(
  ({ components: { Alert } }) => ({
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
  })
);

export const alertStyles = createStyles(
  ({ space }) =>
    ({
      containerIcon: {
        base: { alignSelf: 'center' },
        media: { md: { alignSelf: 'baseline', paddingTop: 3 } },
      },
      container: {
        base: {
          paddingVertical: space.xxs,
          paddingHorizontal: space.xs,
          padding: space.xxs,
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
      group: { base: { flex: 1, flexShrink: 1 } },
    }) as const
);

const actionStyles = createStyles(({ components: { Alert } }) => ({
  base: {
    base: { alignSelf: 'center' },
    media: { md: { alignSelf: 'baseline' } },
    web: {
      'base': { boxSizing: 'border-box' },
      ':focus': {
        outlineWidth: '2px',
        outlineOffset: '2px',
        outlineStyle: 'solid',
      },
    },
  },
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
}));

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

type Status = keyof typeof containerStyles;

export type AlertProps = YBoxProps & {
  /**
   * Select style of alert
   * @default 'infos'
   */
  status?: Status;
};

const alertContext = createContext<Pick<AlertProps, 'status'>>({});

const Container = ({
  status = 'info',
  children,
  style,
  ...props
}: AlertProps) => {
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
Container.displayName = 'Alert';

const AlertIcon = () => {
  const { status } = useContext(alertContext);
  const { color } = composeStyles(
    alertDescriptionStyles.base,
    alertDescriptionStyles[status]
  ).style().style;
  const Comp = match(status)
    .with('error', () => XCircle)
    .with('info', () => Info)
    .with('success', () => CheckCircle)
    .with('warning', () => AlertTriangle)
    .exhaustive();
  return (
    <Box style={alertStyles.containerIcon}>
      <Comp color={color} size={16} />
    </Box>
  );
};
AlertIcon.displayName = 'Alert.Icon';

const AlertDescription = (props: TextProps) => {
  const { status } = useContext(alertContext);
  return (
    <Text
      {...props}
      style={composeStyles(
        alertDescriptionStyles.base,
        alertDescriptionStyles[status],
        props.style
      )}
    />
  );
};
AlertDescription.displayName = 'Alert.Description';

export type GroupProps = { style?: CrossedMethods<any, any> } & Omit<
  TextProps,
  'style'
>;

const AlertGroup = ({ style, ...props }: GroupProps) => {
  return (
    <YBox
      space="xs"
      {...props}
      style={composeStyles(alertStyles.group, style)}
    />
  );
};
AlertGroup.displayName = 'Alert.Group';

const AlertAction = (props: ButtonProps) => {
  const { status } = useContext(alertContext);
  return (
    <Button
      variant="tertiary"
      size={false}
      {...props}
      style={composeStyles(actionStyles.base, actionStyles[status])}
    />
  );
};
AlertAction.displayName = 'Alert.Action';

const ActionText = (props: ButtonTextProps) => {
  const { status } = useContext(alertContext);
  return (
    <ButtonText
      {...props}
      style={composeStyles(alertActionTextStyles[status], props.style)}
    />
  );
};
ActionText.displayName = 'Alert.Action.Text';

const Alert = withStaticProperties(Container, {
  Icon: AlertIcon,
  Description: AlertDescription,
  Action: withStaticProperties(AlertAction, { Text: ActionText }),
  Group: AlertGroup,
});

export { Alert, AlertIcon, ActionText, AlertDescription, AlertGroup };
