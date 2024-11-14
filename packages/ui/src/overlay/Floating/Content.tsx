/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import Animated, { AnimatedProps } from 'react-native-reanimated';
import { View, ViewProps } from 'react-native';
import { forwardRef, memo } from 'react';
import { CrossedMethods } from '@crossed/styled';

export type FloatingContentProps = Partial<AnimatedProps<ViewProps>> & {
  style?: CrossedMethods<any>;
  animatedStyle?: AnimatedProps<ViewProps>['style'];
};

export const FloatingContent = memo(
  forwardRef<View, FloatingContentProps>(
    ({ style, animatedStyle, ...props }: FloatingContentProps, ref) => {
      return (
        <Animated.View
          {...props}
          style={[
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
FloatingContent.displayName = 'Floating.Content';
