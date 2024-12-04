/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { View, type ViewProps } from 'react-native';
import {
  composeStyles,
  createStyles,
  type BaseCrossedPropsExtended,
  type CrossedMethods,
} from '@crossed/styled';
import { forwardRef } from 'react';
import { baseStyle } from '../styles/base';
import { gapStyles } from '../styles/gap';

const styleBox = createStyles(
  () =>
    ({
      root: {
        base: { display: 'flex' },
        web: { base: { boxSizing: 'border-box' } },
      },
      center: {
        base: { alignItems: 'center', justifyContent: 'center' },
      },
    }) as const
);

/**
 * Represents the properties for a Box component.
 */
export type BoxProps = {
  /**
   * extends style
   */
  style?: CrossedMethods<any>;
  /**
   * Gap between children
   * if null, disable gap
   */
  space?: null | keyof typeof gapStyles;
  /**
   * Center content
   * @default false
   */
  center?: boolean;
} & Omit<BaseCrossedPropsExtended & ViewProps, 'style'>;

export const Box = forwardRef<View, BoxProps>(
  (
    {
      style,
      className,
      space,
      center,
      active,
      hover,
      focus,
      ...props
    }: BoxProps,
    ref
  ) => {
    return (
      <View
        ref={ref}
        {...props}
        {...composeStyles(
          baseStyle.view,
          styleBox.root,
          center === true && styleBox.center,
          gapStyles[space],
          style
        ).rnw({
          className,
          active,
          hover,
          focus,
        })}
      />
    );
  }
);
