/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import Animated, { AnimatedProps } from 'react-native-reanimated';
import { View, ViewProps } from 'react-native';
import { memo, Ref } from 'react';
import { CrossedMethods, inlineStyle } from '@crossed/styled';

export type FloatingContentProps = Partial<AnimatedProps<ViewProps>> & {
  /**
   * Crossed style
   */
  style?: CrossedMethods<any>;
  /**
   * Animated view style
   */
  animatedStyle?: AnimatedProps<ViewProps>['style'];

  ref?: Ref<View>;
};

export const FloatingContent = memo<FloatingContentProps>(
  ({ style, animatedStyle, ...props }) => {
    return (
      <Animated.View
        {...props}
        style={[
          inlineStyle(() => ({ base: { zIndex: 1 } })).style().style,
          ...(Array.isArray(style) ? style : [style]).map((e) =>
            e?.style ? e.style().style : e
          ),
          animatedStyle,
        ]}
        ref={props.ref}
      />
    );
  }
);
FloatingContent.displayName = 'Floating.Content';
