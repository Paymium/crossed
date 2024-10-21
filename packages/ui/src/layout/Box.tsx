/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { StyleProp, View, ViewStyle, type ViewProps } from 'react-native';
import {
  composeStyles,
  createStyles,
  type BaseCrossedPropsExtended,
  type CrossedMethods,
} from '@crossed/styled';
import { forwardRef } from 'react';
import { baseStyle } from '../styles/base';
import { gapStyles } from '../styles/gap';
import Animated, { AnimatedStyle } from 'react-native-reanimated';

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

export type BoxProps = {
  /**
   * extends style
   */
  style?: CrossedMethods<any>;
  /**
   * Gap between children
   */
  space?: keyof typeof gapStyles;
  /**
   * Center content
   * @default false
   */
  center?: boolean;

  /**
   * Animatedstyled
   */
  animatedStyle?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
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
      animatedStyle,
      ...props
    }: BoxProps,
    ref
  ) => {
    return (
      <Animated.View
        ref={ref}
        {...props}
        style={[
          composeStyles(
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
          }).style,
          animatedStyle,
        ]}
      />
    );
  }
);
