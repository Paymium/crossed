/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  cloneElement,
  ComponentProps,
  isValidElement,
  memo,
  PropsWithChildren,
} from 'react';
import { XBox, Box } from '../layout';
import { Text } from '../typography';
import { composeStyles, createStyles, CrossedMethods } from '@crossed/styled';
import { createScope, withStaticProperties } from '@crossed/core';

const badgeTypeStyles = createStyles(({ space }) => ({
  default: { base: { borderWidth: 1, borderRadius: space.sm } },
  pill: { base: { borderWidth: 1, borderRadius: 9999 } },
}));

const badgeColorStyles = createStyles(({ colors }) => ({
  default: { base: { borderColor: '#9890FF', backgroundColor: '#F7F5FF' } },
  success: {
    base: {
      backgroundColor: colors.success.light,
      borderColor: colors.success.primary,
    },
  },
  warning: {
    base: {
      backgroundColor: colors.warning.light,
      borderColor: colors.warning.primary,
    },
  },
  error: {
    base: {
      backgroundColor: colors.error.low,
      borderColor: colors.error.primary,
    },
  },
  info: {
    base: {
      backgroundColor: colors.info.light,
      borderColor: colors.info.primary,
    },
  },
  gray: {
    base: {
      backgroundColor: '#FAFAFA',
      borderColor: '#E9EAEB',
    },
  },
}));

const sizeBadgeStyles = createStyles(({ space }) => ({
  sm: { base: { paddingHorizontal: space.md, paddingVertical: space.xxs } },
  md: { base: { paddingHorizontal: space.md, paddingVertical: space.xxs } },
  lg: {
    base: {
      paddingHorizontal: space.lg,
      paddingTop: space.xs,
      paddingBottom: space.xs,
    },
  },
}));

const sizeBadgeTextStyles = createStyles(({ font }) => ({
  sm: {
    base: {
      lineHeight: font.lineHeight.sm,
      fontSize: font.fontSize.xs,
    },
    media: {
      md: {
        lineHeight: font.lineHeight.sm,
        fontSize: font.fontSize.xs,
      },
    },
  },
  md: {
    base: {
      lineHeight: font.lineHeight.md,
      fontSize: font.fontSize.sm,
    },
    media: {
      md: {
        lineHeight: font.lineHeight.md,
        fontSize: font.fontSize.sm,
      },
    },
  },
  lg: {
    base: {
      lineHeight: font.lineHeight.md,
      fontSize: font.fontSize.sm,
    },
    media: {
      md: {
        lineHeight: font.lineHeight.md,
        fontSize: font.fontSize.sm,
      },
    },
  },
}));

const badgeTextStyles = createStyles(({ colors }) => ({
  default: { base: { color: colors.text.secondary } },
  success: { base: { color: colors.success.dark } },
  warning: { base: { color: colors.warning.dark } },
  error: { base: { color: colors.error.satured } },
  info: { base: { color: colors.info.dark } },
  gray: { base: { color: '#414651' } },
}));

const iconColors = createStyles(({ colors }) => ({
  default: {
    base: {
      backgroundColor: colors.neutral[70],
    },
  },
  success: {
    base: {
      color: colors.success.primary,
    },
  },
  warning: {
    base: {
      color: colors.warning.primary,
    },
  },
  error: {
    base: {
      color: colors.error.primary,
    },
  },
  info: {
    base: {
      color: colors.info.primary,
    },
  },
  gray: { base: { color: '#717680' } },
}));

export type BadgeVariants = keyof typeof badgeColorStyles;
type Type = keyof typeof badgeTypeStyles;
type BadgeProps = ComponentProps<typeof Box> & {
  variant?: BadgeVariants;
  type?: Type;
  size?: 'sm' | 'md' | 'lg';
  onPress?: () => void;
};

const [Provider, useContext] = createScope<{
  variant: BadgeVariants;
  size?: 'sm' | 'md' | 'lg';
}>({ variant: 'default' });

const BadgeText = memo<ComponentProps<typeof Text>>(({ style, ...props }) => {
  const { variant, size } = useContext();
  return (
    <Text
      style={composeStyles(
        variant && badgeTextStyles[variant],
        size && sizeBadgeTextStyles[size],
        style
      )}
      textAlign={'center'}
      weight={'lg'}
      {...props}
    />
  );
});
const BadgeRoot = memo<BadgeProps>(
  ({
    children,
    style,
    variant = 'default',
    size = 'sm',
    type = 'default',
    onPress,
    ...props
  }) => {
    return (
      <Provider variant={variant} size={size}>
        <XBox
          alignItems={'center'}
          space={size === 'sm' ? 'xs' : 'sm'}
          {...props}
          style={composeStyles(
            badgeTypeStyles[type],
            badgeColorStyles[variant],
            sizeBadgeStyles[size],
            style
          )}
          pressable={!!onPress}
          onPress={onPress}
        >
          {children}
        </XBox>
      </Provider>
    );
  }
);

export const BadgeIcon = ({
  children,
  style,
}: PropsWithChildren<{ style?: CrossedMethods<any> }>) => {
  const { variant } = useContext();

  const color = composeStyles(iconColors[variant], style).style().style.color;

  return isValidElement(children)
    ? cloneElement(children, { color } as any)
    : children;
};
BadgeIcon.displayName = 'Badge.Icon';

export const Badge = withStaticProperties(BadgeRoot, {
  Text: BadgeText,
  Icon: BadgeIcon,
});
