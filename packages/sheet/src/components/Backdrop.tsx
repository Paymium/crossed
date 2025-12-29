/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Animated from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity) as React.ComponentType<any>;

export interface BackdropProps extends Partial<TouchableOpacityProps> {
  animatedStyle: any;
  overlayColor: string;
  onPress?: (event?: any) => void;
  pressBehavior?: 'none' | 'close';
}

export const Backdrop: React.FC<BackdropProps> = ({
  animatedStyle,
  overlayColor,
  onPress,
  pressBehavior = 'close',
  ...restProps
}) => {
  const handlePress = () => {
    if (pressBehavior === 'close' && onPress) {
      onPress();
    }
  };

  return (
    <AnimatedTouchableOpacity
      activeOpacity={1}
      onPress={handlePress}
      style={[
        styles.backdrop,
        { backgroundColor: overlayColor },
        animatedStyle,
      ]}
      {...restProps}
    />
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
});
