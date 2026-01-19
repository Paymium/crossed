/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useEffect, useMemo } from 'react';
import { Dimensions } from 'react-native';
import {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { snapPointsToPixels, interpolate } from './calculations';
import { SPRING_CONFIG } from './animations';

export interface BottomSheetAnimations {
  translateY: any; // Animated.SharedValue<number>
  isOpen: any; // Animated.SharedValue<boolean>
  currentSnapIndex: any; // Animated.SharedValue<number>
  sheetHeight: any; // Animated.SharedValue<number>
  screenHeight: any; // Animated.SharedValue<number>
  snapPointsPixels: any; // Animated.SharedValue<number[]>
  gestureTranslateY: any; // Animated.SharedValue<number>
  gestureActive: any; // Animated.SharedValue<boolean>
}

/**
 * Hook to manage snap points and convert percentages to pixels
 */
export function useSnapPoints(
  snapPoints: number[],
  containerHeight: number
): number[] {
  return useMemo(() => {
    if (containerHeight === 0) return [];
    return snapPointsToPixels(snapPoints, containerHeight);
  }, [snapPoints, containerHeight]);
}

/**
 * Hook to create and manage all bottom sheet animations
 */
export function useBottomSheetAnimations(
  snapPoints: number[],
  _initialSnapIndex: number,
  onSnapIndexChange?: (index: number) => void,
  onChange?: (position: number, height: number) => void
): BottomSheetAnimations {
  const screenHeight = Dimensions.get('window').height;

  // Core animation values
  const translateY = useSharedValue(screenHeight); // Start closed
  const isOpen = useSharedValue(false);
  const currentSnapIndex = useSharedValue(-1); // -1 = closed
  const sheetHeight = useSharedValue(0);
  const screenHeightValue = useSharedValue(screenHeight);
  const snapPointsPixels = useSharedValue<number[]>([]);
  const gestureTranslateY = useSharedValue(0);
  const gestureActive = useSharedValue(false);

  // Update snap points when they change
  useEffect(() => {
    if (sheetHeight.value > 0) {
      snapPointsPixels.value = snapPointsToPixels(
        snapPoints,
        screenHeightValue.value
      );
    }
  }, [snapPoints, sheetHeight.value, screenHeightValue, snapPointsPixels]);

  // Listen for snap index changes
  useAnimatedReaction(
    () => currentSnapIndex.value,
    (current, previous) => {
      if (current !== previous && current >= 0 && onSnapIndexChange) {
        runOnJS(onSnapIndexChange)(current);
      }
    },
    [onSnapIndexChange]
  );

  // Listen for position changes
  useAnimatedReaction(
    () => translateY.value,
    (current, previous) => {
      if (current !== previous && onChange) {
        // Calculate position as percentage (0-100)
        const position =
          ((screenHeightValue.value - current) / screenHeightValue.value) * 100;
        runOnJS(onChange)(position, sheetHeight.value);
      }
    },
    [onChange]
  );

  return {
    translateY,
    isOpen,
    currentSnapIndex,
    sheetHeight,
    screenHeight: screenHeightValue,
    snapPointsPixels,
    gestureTranslateY,
    gestureActive,
  };
}

/**
 * Hook to create backdrop animated style based on sheet position
 */
export function useBackdropAnimation(
  translateY: any,
  snapPointsPixels: any,
  screenHeight: any,
  defaultOverlayOpacity: number
) {
  return useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [snapPointsPixels.value[0] || 0, screenHeight.value],
      [defaultOverlayOpacity, 0],
      'clamp'
    );

    return {
      opacity,
    };
  });
}

/**
 * Hook to create sheet animated style based on translateY
 */
export function useSheetAnimation(translateY: any) {
  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
}

/**
 * Helper function to animate to a snap point
 */
export function animateToSnapPoint(
  animations: BottomSheetAnimations,
  snapIndex: number,
  onFinish?: () => void
) {
  'worklet';
  const targetY = animations.snapPointsPixels.value[snapIndex];

  if (targetY === undefined) {
    if (onFinish) runOnJS(onFinish)();
    return;
  }

  animations.translateY.value = withSpring(
    targetY,
    SPRING_CONFIG,
    (finished) => {
      if (finished) {
        animations.currentSnapIndex.value = snapIndex;
        animations.isOpen.value = true;
        if (onFinish) {
          runOnJS(onFinish)();
        }
      }
    }
  );
}

/**
 * Helper function to animate sheet to closed position
 */
export function animateToClose(
  animations: BottomSheetAnimations,
  onFinish?: () => void
) {
  'worklet';
  animations.translateY.value = withSpring(
    animations.screenHeight.value,
    SPRING_CONFIG,
    (finished) => {
      if (finished) {
        animations.currentSnapIndex.value = -1;
        animations.isOpen.value = false;
        if (onFinish) {
          runOnJS(onFinish)();
        }
      }
    }
  );
}
