/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentProps, memo } from 'react';
import { Text } from '../typography/Text';
import { Box } from '../layout/Box';
import { composeStyles, createStyles } from '@crossed/styled';
import { createScope, withStaticProperties } from '@crossed/core';

const badgeStyles = createStyles(({ space, colors }) => ({
  default: {
    base: {
      paddingLeft: space.md,
      paddingRight: space.md,
      paddingTop: space.md,
      paddingBottom: space.md,
      marginTop: 0,
      borderRadius: 4,
      backgroundColor: colors.background.primary,
    },
  },
  success: { base: { backgroundColor: colors.success.light } },
  warning: { base: { backgroundColor: colors.warning.light } },
  error: { base: { backgroundColor: colors.error.low } },
  info: { base: { backgroundColor: colors.info.light } },
}));

const badgeTextStyles = createStyles(({ colors }) => ({
  success: { base: { color: colors.success.primary } },
  warning: { base: { color: colors.warning.primary } },
  error: { base: { color: colors.error.primary } },
  info: { base: { color: colors.info.primary } },
}));

type Variants = Exclude<keyof typeof badgeStyles, 'default'>;
type BadgeProps = ComponentProps<typeof Box> & { variant?: Variants };

const [Provider, useContext] = createScope<{ variant?: Variants }>({});

const BadgeText = memo<ComponentProps<typeof Text>>(({ style, ...props }) => {
  const { variant } = useContext();
  return (
    <Text
      style={composeStyles(variant && badgeTextStyles[variant], style)}
      weight={'lg'}
      {...props}
    />
  );
});
const BadgeRoot = memo<BadgeProps>(({ children, style, variant, ...props }) => {
  return (
    <Provider variant={variant}>
      <Box
        {...props}
        style={composeStyles(
          badgeStyles.default,
          variant && badgeStyles[variant],
          style
        )}
      >
        {children}
      </Box>
    </Provider>
  );
});

export const Badge = withStaticProperties(BadgeRoot, { Text: BadgeText });
