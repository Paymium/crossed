/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { FocusScope } from '@crossed/primitive';
import Animated, { AnimatedProps } from 'react-native-reanimated';
import { Slot, SlotProps } from '../../Slot';
import { View, ViewProps } from 'react-native';
import { forwardRef } from 'react';
// import { modalStyles } from '../styles';

export type FloatingContentProps = Partial<SlotProps<AnimatedProps<ViewProps>>>;

export const FloatingContent = forwardRef<View, FloatingContentProps>(
  (props: FloatingContentProps, ref) => {
    return (
      <FocusScope trapped loop ref={ref as any}>
        <Animated.View {...props}  />
      </FocusScope>
    );
  }
);
FloatingContent.displayName = 'Floating.Content';
