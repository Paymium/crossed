/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { FocusScope, FocusScopeProps } from '@crossed/primitive';
import { PropsWithChildren } from 'react';
import { CrossedMethods } from '@crossed/styled';
import Animated, { AnimatedProps } from 'react-native-reanimated';
import { Slot, SlotProps } from '../../Slot';
import { ViewProps } from 'react-native';
// import { modalStyles } from '../styles';

export type FloatingContentProps = Omit<
  SlotProps<AnimatedProps<ViewProps>>,
  'Comp'
>;

export const FloatingContent = (props: FloatingContentProps) => {
  return (
    <FocusScope trapped loop>
      <Slot Comp={Animated.View} {...props} />
    </FocusScope>
  );
};
FloatingContent.displayName = 'Floating.Content';
