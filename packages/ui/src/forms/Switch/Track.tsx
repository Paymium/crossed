/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import Animated, {
  interpolateColor,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { composeStyles, useTheme } from '@crossed/styled';
import { styles } from './styles';
import { useContext } from 'react';
import { localContext } from './context';
import { Thumb } from './Thumb';

export const SwitchTrack = () => {
  const { value, duration, height, width, disabled } = useContext(localContext);
  // const { components } = useTheme();

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      value ? 1 : 0,
      [0, 1],
      []
      // [components.Switch.off.background, components.Switch.on.background]
    );
    return {
      backgroundColor: withTiming(color, { duration }),
    };
  }, [value]);

  return (
    <Animated.View
      onLayout={(e) => {
        height.value = e.nativeEvent.layout.height;
        width.value = e.nativeEvent.layout.width;
      }}
      style={[
        composeStyles(
          styles.track,
          disabled && styles.disabledOff,
          disabled && value && styles.disabledOn
        ).style().style,
        trackAnimatedStyle,
      ]}
    >
      <Thumb />
    </Animated.View>
  );
};
