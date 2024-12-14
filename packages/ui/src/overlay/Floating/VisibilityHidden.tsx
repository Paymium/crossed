/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import Animated, { AnimatedProps } from 'react-native-reanimated';
import { View, ViewProps } from 'react-native';
import { forwardRef, memo, RefAttributes } from 'react';
import { composeStyles, CrossedMethods, inlineStyle } from '@crossed/styled';
import { visibility } from '../../styles/visibilityHidden';
import { useFloatingContext } from './context';
import { positionStyles } from '../../styles/position';

export type FloatingVisibilityHiddenProps = Partial<
  AnimatedProps<ViewProps>
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
              open && positionStyles.absoluteFill,
              !open && visibility.hidden
            ).style().style,
            ...(Array.isArray(style) ? style : [style]).map((e) =>
              e?.style ? e.style().style : e
            ),
            animatedStyle,
          ]}
          ref={ref}
        />
      );
    }
  )
);
FloatingVisibilityHidden.displayName = 'Floating.VisibilityHidden';
