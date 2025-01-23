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
import { composeStyles, isWeb, Registry } from '@crossed/styled';
import { styles } from './styles';
import { useContext, useMemo } from 'react';
import { localContext } from './context';
import { Thumb } from './Thumb';

export const Track = () => {
  const { sharedValue, trackColors, duration, height, width, disabled } =
    useContext(localContext);
  const themeName = Registry.themeName;
  const backgroundColor = useMemo(() => {
    return !sharedValue.value ? trackColors.off : trackColors.on;
  }, [sharedValue.value, themeName]);

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      Number(sharedValue.value),
      [0, 1],
      [trackColors.off, trackColors.on]
    );
    return {
      backgroundColor: withTiming(color, { duration }),
    };
  }, [sharedValue.value]);

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
          disabled && sharedValue.value && styles.disabledOn
        ).style().style,
        !isWeb && trackAnimatedStyle,
        {
          backgroundColor: backgroundColor,
        },
      ]}
    >
      <Thumb />
    </Animated.View>
  );
};
