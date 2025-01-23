/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import Animated, {
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { styles } from './styles';
import { useContext } from 'react';
import { localContext } from './context';

export const Thumb = () => {
  const { sharedValue, duration, height, width } = useContext(localContext);
  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const moveValue = interpolate(
      Number(sharedValue.value),
      [0, 1],
      [0, width.value - height.value]
    );
    return {
      transform: [{ translateX: withTiming(moveValue, { duration }) }],
    };
  }, [sharedValue.value]);

  return (
    <Animated.View style={[styles.thumb.style().style, thumbAnimatedStyle]} />
  );
};
