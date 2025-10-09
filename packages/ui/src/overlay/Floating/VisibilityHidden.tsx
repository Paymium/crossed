/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import Animated, { AnimatedProps } from 'react-native-reanimated';
import { View, ViewProps } from 'react-native';
import { forwardRef, memo, RefAttributes } from 'react';
import {
  composeStyles,
  CrossedMethods,
  inlineStyle,
  isWeb,
} from '@crossed/styled';
import { visibility } from '../../styles/visibilityHidden';
import { useFloatingContext } from './context';

export type FloatingVisibilityHiddenProps = Partial<
  Omit<AnimatedProps<ViewProps>, 'style'>
> & {
  /**
   * Crossed style
   */
  style?: CrossedMethods<any>;
  /**
   * Animated view style
   */
  animatedStyle?: AnimatedProps<ViewProps>['style'];
};

export const FloatingVisibilityHidden = memo<
  FloatingVisibilityHiddenProps & RefAttributes<View>
>(
  forwardRef<View, FloatingVisibilityHiddenProps>(
    ({ style, animatedStyle, ...props }, ref) => {
      const { open } = useFloatingContext();
      return (
        <Animated.View
          {...props}
          style={[
            composeStyles(
              inlineStyle(() => ({ base: { zIndex: 1 } })),
              !open && isWeb && visibility.hidden,
              style
            ).style().style,
            animatedStyle,
          ]}
          ref={ref}
        />
      );
    }
  )
);
FloatingVisibilityHidden.displayName = 'Floating.VisibilityHidden';
