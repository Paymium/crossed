/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles, composeStyles } from '@crossed/styled';
import { Box } from './Box';
import { ComponentProps } from 'react';

export const useDivider = createStyles(
  ({ colors }) =>
    ({
      divider: { base: { borderStyle: 'solid' } },
      primary: {
        base: {
          borderColor: colors.border.secondary.default,
        },
      },
      secondary: {
        base: {
          borderColor: colors.border.secondary.alt,
        },
      },
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

export type DividerProps = ComponentProps<typeof Box> & {
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
  return (
    <Box
      role="separator"
      {...props}
      style={composeStyles(
        useDivider.divider,
        useDivider[direction],
        useDivider[color],
        props.style
      )}
    />
  );
};
Divider.displayName = 'Divider';
