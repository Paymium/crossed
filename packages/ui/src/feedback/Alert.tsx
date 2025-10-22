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
  inlineStyle,
} from '@crossed/styled';
import {
  ComponentProps,
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
} from 'react';
import { YBox, type YBoxProps } from '../layout/YBox';
import { match } from 'ts-pattern';
import { AlertCircle, CheckCircle, Help } from '@crossed/icons';
import { Box } from '../layout/Box';
import { ColorPaths } from '@crossed/icons/lib/typescript/types';
import { XBox } from '../layout';
import { CloseButton } from '../buttons';
import { Adapt } from '../other';
import {
  flexDirectionResponsiveStyles,
  growStyles,
  justifyContentStyle,
} from '../styles';

const containerIconRound = createStyles(({ radius, colors }) => ({
  parent: { base: { position: 'relative', width: 38, height: 38 } },
  flat: {
    base: {
      borderRadius: radius.md,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: colors.border.brand.default,
      backgroundColor: colors.background.primary.default,
    },
  },
  firstLine: {
    base: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      borderWidth: 2,
      borderStyle: 'solid',
      borderRadius: radius['3xl'],
      opacity: 0.1,
    },
  },
  secondLine: {
    base: {
      position: 'absolute',
      top: 6,
      bottom: 6,
      left: 6,
      right: 6,
      borderWidth: 2,
      borderStyle: 'solid',
      borderRadius: radius['3xl'],
      opacity: 0.3,
    },
  },
}));

const containerIconStyles = createStyles(({ colors }) => ({
  brand: {
    base: {
      borderColor: colors.foreground.brand.primary.default,
    },
  },
  info: {
    base: {
      borderColor: colors.foreground.tertiary.default,
    },
  },
  success: {
    base: {
      borderColor: colors.foreground.success.primary.default,
    },
  },
  error: {
    base: {
      borderColor: colors.foreground.error.primary.default,
    },
  },
  warning: {
    base: {
      borderColor: colors.foreground.warning.primary.default,
    },
  },
}));

export const alertStyles = createStyles(
  ({ space, radius, colors }) =>
    ({
      floating: {
        base: {
          borderRadius: radius.xl,
          borderWidth: 1,
          borderColor: colors.border.secondary.w,
        },
      },
      container: {
        base: {
          padding: space.xl,
          borderTopWidth: 1,
          borderColor: colors.border.primary.default,
          backgroundColor: colors.background.primary.alt,
          borderStyle: 'solid',
          gap: space.xs,
        },
        media: {
          md: {
            borderTopWidth: 0,
            borderBottomWidth: 1,
            flexDirection: 'row',
            gap: space.md,
          },
        },
      },
      group: { base: { flex: 1, flexShrink: 1 } },
    }) as const
);

const containerStyles = createStyles(() => ({
  error: {
    base: {
      // borderColor: Alert.error.border,
      // backgroundColor: Alert.error.background,
    },
  },
  success: {
    base: {
      // borderColor: Alert.success.border,
      // backgroundColor: Alert.success.background,
    },
  },
  warning: {
    base: {
      // borderColor: Alert.warning.border,
      // backgroundColor: Alert.warning.background,
    },
  },
  info: {
    base: {
      // borderColor: Alert.info.border,
      // backgroundColor: Alert.info.background,
    },
  },
  brand: { base: {} },
}));

type Status = keyof typeof containerStyles;

export type AlertProps = YBoxProps & {
  /**
   * Select style of alert
   * @default 'infos'
   */
  status?: Status;

  /**
   * Show rounded Icon
   */
  rounded?: boolean;
  /**
   * Floating style
   */
  floating?: boolean;
  /**
   * Style pass to container
   */
  containerStyle?: CrossedMethods<any>;
};

export const alertContext = createContext<
  Pick<AlertProps, 'status' | 'rounded'>
>({});

const Container = ({
  status = 'info',
  children,
  style,
  rounded,
  floating,
  containerStyle,
  ...props
}: AlertProps) => {
  return (
    <alertContext.Provider value={{ status, rounded }}>
      <YBox
        role="alert"
        {...props}
        style={composeStyles(
          alertStyles.container,
          floating && alertStyles.floating,
          !floating && justifyContentStyle.center,
          containerStyles[status],
          style
        )}
      >
        <YBox
          space="xl"
          style={composeStyles(
            growStyles.on,
            flexDirectionResponsiveStyles.mdRow,
            !floating && inlineStyle(() => ({ base: { maxWidth: 1280 } })),
            containerStyle
          )}
        >
          {children}
        </YBox>
      </YBox>
    </alertContext.Provider>
  );
};
Container.displayName = 'Alert';

const IconRound = ({ children }: PropsWithChildren) => {
  const { status, rounded } = useContext(alertContext);
  return (
    <Box
      center
      style={composeStyles(
        containerIconRound.parent,
        !rounded && containerIconRound.flat
      )}
    >
      {rounded && (
        <>
          <Box
            style={composeStyles(
              containerIconRound.firstLine,
              containerIconStyles[status]
            )}
          />
          <Box
            style={composeStyles(
              containerIconRound.secondLine,
              containerIconStyles[status]
            )}
          />
        </>
      )}
      {children}
    </Box>
  );
};

const AlertIcon = () => {
  const { status } = useContext(alertContext);
  const Comp = match(status)
    .with('brand', () => Help)
    .with('error', () => Help)
    .with('info', () => Help)
    .with('success', () => CheckCircle)
    .with('warning', () => AlertCircle)
    .exhaustive();
  return (
    <IconRound>
      <Comp
        color={match(status)
          .returnType<ColorPaths>()
          .with('brand', () => 'foreground.brand.primary.default')
          .with('error', () => 'foreground.error.primary.default')
          .with('info', () => 'foreground.tertiary.default')
          .with('success', () => 'foreground.success.primary.default')
          .with('warning', () => 'foreground.warning.primary.default')
          .exhaustive()}
        size={16}
      />
    </IconRound>
  );
};
AlertIcon.displayName = 'Alert.Icon';

const AlertDescription = (props: TextProps) => {
  return <Text color={'tertiary'} fontSize={'sm'} {...props} />;
};
AlertDescription.displayName = 'Alert.Description';

export type GroupProps = ComponentProps<typeof YBox>;

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

type AlertTitle = ComponentProps<typeof Text>;
const AlertTitle = ({ ...props }: AlertTitle) => (
  <Text
    fontSize={'sm'}
    fontWeight={'semibold'}
    color={'secondary'}
    {...props}
  />
);
AlertTitle.displayName = 'AlertTitle';

type AlertPresetProps = AlertProps & {
  /**
   * Title of alert
   */
  title?: string;
  /**
   * Description of alert
   */
  description?: string;
  /**
   * actions for alert, is ReactNode
   */
  actions?: ReactNode;
  /**
   * onClose if exist show closable button and call this function when click on it
   */
  onClose?: () => void | Promise<void>;
};
const AlertPreset = ({
  title,
  description,
  actions,
  onClose,
  ...props
}: AlertPresetProps) => {
  return (
    <Alert {...props}>
      <XBox justifyContent={'between'}>
        <Alert.Icon />
        <Adapt size={'md'} fallback={<CloseButton />} />
      </XBox>
      <Alert.Group space={'xl'}>
        <Alert.Group>
          {title && <Alert.Title>{title}</Alert.Title>}
          {description && <Alert.Description>{description}</Alert.Description>}
        </Alert.Group>
        <XBox space={'xl'}>{!!actions && actions}</XBox>
      </Alert.Group>
      <Adapt size={'md'} fallback={null}>
        <CloseButton />
      </Adapt>
    </Alert>
  );
};

const Alert = withStaticProperties(Container, {
  Icon: AlertIcon,
  Title: AlertTitle,
  Description: AlertDescription,
  Group: AlertGroup,
  Preset: AlertPreset,
});

export { Alert, AlertIcon, AlertDescription, AlertGroup, AlertPreset };
