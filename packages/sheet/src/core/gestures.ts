/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, withSpring } from 'react-native-reanimated';
import { calculateTargetSnap, clamp } from './calculations';
import { SPRING_CONFIG, VELOCITY_THRESHOLD } from './animations';
import type { BottomSheetAnimations } from './hooks';

export interface GestureConfig {
  enabled: boolean;
  onSnapIndexChange?: (index: number) => void;
}

/**
 * Create pan gesture handler for bottom sheet
 */
export function createPanGesture(
  animations: BottomSheetAnimations,
  config: GestureConfig
) {
  const { enabled, onSnapIndexChange } = config;

  const panGesture = Gesture.Pan()
    .enabled(enabled)
    .onStart(() => {
      'worklet';
      // Store the starting position for this gesture
      animations.gestureActive.value = true;
      animations.gestureTranslateY.value = animations.translateY.value;
    })
    .onUpdate((event) => {
      'worklet';
      // Update position based on gesture
      const newTranslateY =
        animations.gestureTranslateY.value + event.translationY;

      // Get bounds - can't go above topmost snap point or below screen height
      const minY = animations.snapPointsPixels.value[0] || 0;
      const maxY = animations.screenHeight.value;

      // Clamp the position within bounds
      animations.translateY.value = clamp(newTranslateY, minY, maxY);
    })
    .onEnd((event) => {
      'worklet';
      // Calculate target snap point based on position and velocity
      const targetSnapIndex = calculateTargetSnap(
        animations.translateY.value,
        event.velocityY,
        animations.snapPointsPixels.value,
        VELOCITY_THRESHOLD
      );

      const targetY = animations.snapPointsPixels.value[targetSnapIndex];

      // Animate to the target snap point
      animations.translateY.value = withSpring(
        targetY,
        SPRING_CONFIG,
        (finished) => {
          'worklet';
          if (finished) {
            animations.currentSnapIndex.value = targetSnapIndex;
            if (onSnapIndexChange) {
              runOnJS(onSnapIndexChange)(targetSnapIndex);
            }
          }
        }
      );

      animations.gestureActive.value = false;
    })
    .onFinalize(() => {
      'worklet';
      animations.gestureActive.value = false;
    });

  return panGesture;
}

/**
 * Create a combined gesture that includes pan gesture
 * This can be extended in the future to include simultaneous gestures
 * for scroll coordination
 */
export function createBottomSheetGesture(
  animations: BottomSheetAnimations,
  config: GestureConfig
) {
  return createPanGesture(animations, config);
}
