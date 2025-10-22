/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import Animated from 'react-native-reanimated';
import { composeStyles } from '@crossed/styled';
import { styles, trackSizeStyles } from './styles';
import { useContext } from 'react';
import { localContext } from './context';
import { Thumb } from './Thumb';

export const SwitchTrack = () => {
  const { value, height, width, disabled, hovered, pressed, size } =
    useContext(localContext);

  return (
    <Animated.View
      onLayout={(e) => {
        height.value = e.nativeEvent.layout.height;
        width.value = e.nativeEvent.layout.width;
      }}
      style={[
        composeStyles(
          styles.track,
          trackSizeStyles[size],
          value && styles.toggleOn,
          !value && styles.toggleOff,
          disabled && styles.disabledOff,
          disabled && value && styles.disabledOn
        ).style({ hover: hovered, active: pressed }).style,
      ]}
    >
      <Thumb />
    </Animated.View>
  );
};
