/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import Animated, { AnimatedProps } from 'react-native-reanimated';
import { View, ViewProps } from 'react-native';
import { forwardRef, memo, ReactNode, RefAttributes } from 'react';
import { composeStyles, CrossedMethods, inlineStyle } from '@crossed/styled';
import { useFloatingContext } from './context';

export type FloatingContentProps = Omit<
  Partial<AnimatedProps<ViewProps>>,
  'children' | 'style'
> & {
  /**
   * Crossed style
   */
  style?: CrossedMethods<any>;
  /**
   * Animated view style
   */
  animatedStyle?: AnimatedProps<ViewProps>['style'];

  children?: ReactNode;
};

export const FloatingContent = memo<FloatingContentProps & RefAttributes<View>>(
  forwardRef<View, FloatingContentProps>(
    ({ style, animatedStyle, ...props }, ref) => {
      const { open } = useFloatingContext();

      return open ? (
        <Animated.View
          {...props}
          style={[
            composeStyles(
              inlineStyle(() => ({ base: { zIndex: 1 } })),
              style
            ).style().style,
            animatedStyle,
          ]}
          ref={ref}
        >
          {props.children}
        </Animated.View>
      ) : null;
    }
  )
);
FloatingContent.displayName = 'Floating.Content';
