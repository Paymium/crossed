/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { View, type ViewProps } from 'react-native';
import { createStyles, composeStyles } from '@crossed/styled';

export const useDivider = createStyles(
  ({ colors }) =>
    ({
      divider: { base: { borderStyle: 'solid' } },
      primary: { base: { borderColor: colors.border.primary } },
      secondary: { base: { borderColor: colors.border.secondary } },
      vertical: {
        base: {
          borderLeftWidth: 1,
          height: '100%',
        },
      },
      horizontal: {
        base: {
          borderTopWidth: 1,
          width: '100%',
        },
      },
    }) as const
);

export type DividerProps = ViewProps & {
  /**
   * Direction of divider
   */
  direction?: 'horizontal' | 'vertical';

  /**
   * Color of divider
   */
  color?: 'primary' | 'secondary';
};

export const Divider = ({
  direction = 'horizontal',
  color = 'primary',
  ...props
}: DividerProps) => {
  console.log(direction)
  return (
    <View
      role="separator"
      {...props}
      {...composeStyles(
        useDivider.divider,
        useDivider[direction],
        useDivider[color]
      ).rnw()}
    />
  );
};
Divider.displayName = 'Divider';
