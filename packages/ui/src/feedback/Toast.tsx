/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { withStaticProperties } from '@crossed/core';
import { type TextProps } from '../typography';
import { composeStyles, createStyles, inlineStyle } from '@crossed/styled';
import { useContext, type ReactNode } from 'react';
import { Box, YBox, XBox, YBoxProps } from '../layout';
import { CloseButton } from '../buttons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { shrinkStyles } from '../styles/flex';
import { Alert, alertContext } from './Alert';

const toastStyles = createStyles(
  (t) =>
    ({
      container: {
        base: {
          padding: t.space.xs,
          borderRadius: 8,
        },
        media: {
          xs: {
            paddingVertical: t.space.xs,
            paddingHorizontal: t.space.xs,
          },
          md: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            paddingVertical: t.space.xs,
            paddingHorizontal: t.space.xs,
          },
        },
        web: {
          base: {
            boxShadow: '0px 1px 4px 0px #00000026',
          },
        },
        variants: {},
      },
    }) as const
);

const toastPresetStyles = createStyles(
  () =>
    ({
      container: {
        base: {
          borderWidth: 0,
        },
        media: {
          xs: {},
          md: {
            flexDirection: 'column',
            maxWidth: 538,
          },
        },
        variants: {},
      },
    }) as const
);

const progressBarBackground = createStyles(() => ({
  success: {
    base: {
      // backgroundColor: t.colors.success.primary,
    },
  },
  error: {
    base: {
      // backgroundColor: t.colors.error.primary,
    },
  },
  info: {
    base: {
      // backgroundColor: t.colors.info.primary,
    },
  },
  warning: {
    base: {
      // backgroundColor: t.colors.warning.primary,
    },
  },
}));

type ContainerProps = YBoxProps & {
  closable?: boolean;
  icon?: ReactNode;
  status?: keyof typeof progressBarBackground;
  duration?: number;
};

const Container = ({ status = 'info', children, ...props }: ContainerProps) => {
  return (
    <Alert
      status={status}
      alignSelf={'flex-end'}
      space={'xs'}
      {...props}
      style={composeStyles(toastStyles.container, props.style)}
    >
      {children}
    </Alert>
  );
};

export type ToastPresetProps = YBoxProps & {
  status?: keyof typeof progressBarBackground;
  title?: string;
  description?: string;
  onClose?: () => void;
  onDurationEnd?: () => void;
  duration?: number;
};

const Preset = ({
  status,
  title,
  description,
  onClose,
  duration,
  onDurationEnd,
  ...props
}: ToastPresetProps) => (
  <Toast
    status={status}
    {...props}
    style={composeStyles(toastPresetStyles.container, props.style)}
  >
    <XBox space={'xs'} justifyContent={'between'} style={shrinkStyles.on}>
      <XBox space={'xs'} style={shrinkStyles.on}>
        <Toast.Icon />
        <YBox alignSelf={'center'} style={shrinkStyles.on}>
          {title && <Toast.Title>{title}</Toast.Title>}
          {description && <Toast.Description>{description}</Toast.Description>}
        </YBox>
      </XBox>
      {!!onClose && (
        <CloseButton
          onPress={onClose}
          style={inlineStyle(() => ({
            base: { width: 20, height: 20, alignSelf: 'flex-start' },
          }))}
        />
      )}
    </XBox>
    {!!duration && (
      <Toast.Progress duration={duration} onDurationEnd={onDurationEnd} />
    )}
  </Toast>
);

const Icon = () => {
  return <Alert.Icon />;
};
Icon.displayName = 'Toast.Icon';

const Title = (props: TextProps) => {
  return <Alert.Title {...props} />;
};
Title.displayName = 'Toast.Title';
const Description = (props: TextProps) => {
  return <Alert.Description {...props} />;
};
Description.displayName = 'Toast.Description';

type ProgressProps = {
  duration: number;
  onDurationEnd?: () => void;
};

const Progress = ({ duration = 4000, onDurationEnd }: ProgressProps) => {
  const start = useSharedValue(0);
  const { status } = useContext(alertContext);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(-1 * start.value, {
            duration,
            easing: Easing.linear,
          }),
        },
      ],
    };
  }, [start]);

  setTimeout(() => {
    onDurationEnd?.();
  }, duration);

  return (
    <Box
      style={inlineStyle(() => ({
        base: { overflow: 'hidden', height: 5, width: '100%' },
      }))}
      onLayout={({ nativeEvent: { layout } }) => {
        start.value = layout.width;
      }}
    >
      <Animated.View
        style={[
          animatedStyle,
          composeStyles(
            progressBarBackground[status],
            inlineStyle(() => ({
              base: {
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              },
            }))
          ).style().style,
        ]}
      />
    </Box>
  );
};

const Toast = withStaticProperties(Container, {
  Icon,
  Title,
  Description,
  Preset,
  Progress,
});

const {
  Icon: ToastIcon,
  Title: ToastTitle,
  Description: ToastDescription,
  Progress: ToastProgress,
  Preset: ToastPreset,
} = Toast;

export {
  Toast,
  ToastIcon,
  ToastTitle,
  ToastDescription,
  ToastProgress,
  ToastPreset,
};
