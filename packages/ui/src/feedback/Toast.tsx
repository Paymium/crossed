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
  inlineStyle,
  useTheme,
} from '@crossed/styled';
import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
  useEffect,
  useState,
} from 'react';
import { AlertTriangle, CheckCircle, Info, XCircle } from '@crossed/unicons';
import { Box } from '../layout/Box';
import { YBox, type YBoxProps } from '../layout/YBox';
import { match } from 'ts-pattern';
import { useMedia } from '../useMedia';
import { XBox } from '../layout/XBox';
import { CloseButton } from '../buttons/CloseButton';
import Animated, {
  useAnimatedStyle,
  // useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const toastStyles = createStyles(
  (t) =>
    ({
      description: {
        base: { flex: 1, color: t.colors.text.secondary },
      },
      title: {
        base: { fontWeight: '600', color: t.colors.text.primary },
      },
      icon: {
        base: { fontWeight: '600' },
        variants: {
          status: {
            error: { base: { color: t.components.Banner.error.icon } },
            success: { base: { color: t.components.Banner.success.icon } },
            warning: { base: { color: t.components.Banner.warning.icon } },
            info: { base: { color: t.components.Banner.info.icon } },
          },
        },
      },
      containerTitle: {
        base: { flexDirection: 'row', alignItems: 'center' },
      },
      containerIcon: {
        base: { borderRadius: 32, width: 32, height: 32 },
        variants: {},
      },
      containerChildren: { base: { flex: 1, flexShrink: 1 } },
      closeButton: {
        base: {
          paddingTop: 0,
          paddingRight: 0,
          alignSelf: 'flex-start',
          borderWidth: 1,
        },
      },
      container: {
        base: {
          padding: t.space.xs,
          minWidth: 400,
          borderRadius: 8,
          gap: t.space.xs,
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

const containerIconStyles = createStyles((t) => ({
  error: {
    base: {
      backgroundColor: t.components.Banner.error.backgroundIcon,
    },
  },
  success: {
    base: {
      backgroundColor: t.components.Banner.success.backgroundIcon,
    },
  },
  warning: {
    base: {
      backgroundColor: t.components.Banner.warning.backgroundIcon,
    },
  },
  info: {
    base: {
      backgroundColor: t.components.Banner.info.backgroundIcon,
    },
  },
}));

const containerStyles = createStyles((t) => ({
  error: {
    base: {
      borderColor: t.components.Banner.error.border,
      backgroundColor: t.components.Banner.error.background,
    },
  },
  success: {
    base: {
      borderColor: t.components.Banner.success.border,
      backgroundColor: t.components.Banner.success.background,
    },
  },
  warning: {
    base: {
      borderColor: t.components.Banner.warning.border,
      backgroundColor: t.components.Banner.warning.background,
    },
  },
  info: {
    base: {
      borderColor: t.components.Banner.info.border,
      backgroundColor: t.components.Banner.info.background,
    },
  },
}));

const progressBarStyles = createStyles(() => ({
  container: {
    base: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  progressBar: {
    base: {
      width: '100%',
      height: 5,
      overflow: 'hidden',
    },
  },
}));

const progressBarBackground = createStyles((t) => ({
  success: { base: { backgroundColor: t.colors.success.primary } },
  error: { base: { backgroundColor: t.colors.error.primary } },
  info: { base: { backgroundColor: t.colors.info.primary } },
}));

type ContainerProps = YBoxProps & {
  closable?: boolean;
  icon?: ReactNode;
  status?: keyof typeof containerStyles;
  duration?: number;
};

const toastContext = createContext<Pick<ContainerProps, 'status'>>({});

const Container = ({
  status = 'info',
  children,
  closable = false,
  icon,
  style,
  duration,
  ...props
}: ContainerProps) => {
  const { md } = useMedia();
  return (
    <toastContext.Provider value={{ status }}>
      <Box
        style={composeStyles(
          toastStyles.container,
          containerStyles[status],
          style
        )}
      >
        <XBox space={!md ? 'xs' : 'xxs'} {...props}>
          {icon ? icon : <Icon />}
          <YBox style={toastStyles.containerChildren}>{children}</YBox>
          {closable && <CloseButton style={toastStyles.closeButton} />}
        </XBox>
        {duration && <ProgressBar duration={duration} />}
      </Box>
    </toastContext.Provider>
  );
};

const Icon = () => {
  const { status } = useContext(toastContext);
  const {
    components: { Banner },
  } = useTheme();

  const color = useMemo(() => {
    return Banner[status].icon;
  }, [status, Banner]);

  const Comp = match(status)
    .with('error', () => XCircle)
    .with('info', () => Info)
    .with('success', () => CheckCircle)
    .with('warning', () => AlertTriangle)
    .exhaustive();
  return (
    <Box
      center
      style={composeStyles(
        toastStyles.containerIcon,
        containerIconStyles[status]
      )}
    >
      <Comp color={color} size={16} />
    </Box>
  );
};

const Title = (props: TextProps) => {
  return (
    <Box space="sm" style={toastStyles.containerTitle}>
      <Text
        weight="lg"
        numberOfLines={1}
        {...props}
        style={composeStyles(toastStyles.title, props.style)}
      />
    </Box>
  );
};
const Description = (props: TextProps) => {
  return (
    <Text
      role="alert"
      {...props}
      style={composeStyles(toastStyles.description, props.style)}
    />
  );
};

const ProgressBar = ({ duration = 4000 }) => {
  // const width= useSharedValue(100)
  const { status } = useContext(toastContext);
  const [test, setTest] = useState(true);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(test ? '100%' : '0%', { duration }),
      height: '100%',
    };
  }, [test]);

  useEffect(() => {
    setTest(false);
  }, []);

  // const animatedStyle = useAnimatedStyle(() => {
  //   return {
  //     width: `${width.value}%`,
  //     height: '100%',
  //   };
  // }, [test]);
  //
  // useEffect(() => {
  //   width.value = withTiming(0, { duration });
  // }, []);

  return (
    <Box>
      <Box
        style={composeStyles(
          progressBarStyles.progressBar,
          containerStyles[status]
        )}
      >
        <Animated.View style={animatedStyle}>
          <Box
            style={composeStyles(
              progressBarBackground[status],
              inlineStyle(() => ({ base: { height: '100%' } }))
            )}
          />
        </Animated.View>
      </Box>
    </Box>
  );
};

const Toast = withStaticProperties(Container, {
  Icon,
  Title,
  Description,
});

const {
  Icon: ToastIcon,
  Title: ToastTitle,
  Description: ToastDescription,
} = Toast;

export { Toast, ToastIcon, ToastTitle, ToastDescription };
