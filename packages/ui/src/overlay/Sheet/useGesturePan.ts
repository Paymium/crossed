/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useRef } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import { useMaxHeight } from './useMaxHeight';
import { useSheetContext } from './context';
import { runOnJS, withTiming } from 'react-native-reanimated';
import { useFloatingContext } from '../Floating/context';

export const useGesturePan = ({ isMove, scroll, initialHeight }) => {
  const maxHeight = useMaxHeight();
  const { onClose } = useFloatingContext();
  const { hideHandle, translateY } = useSheetContext();
  const gesturePan = useRef(
    Gesture.Pan()
      .onTouchesDown(() => {
        isMove.value = true;
        initialHeight.value = translateY.value;
      })
      .onChange((e) => {
        if (translateY.value > 0 || e.changeY > 0) {
          translateY.value += e.changeY;
        } else {
          translateY.value = 0;
        }
      })
      .onEnd((e) => {
        if (translateY.value < 0) {
          translateY.value = withTiming(0, { duration: 200 });
        }
        if (e.translationY > 0 && scroll.value <= 0) {
          if (
            Math.abs(e.velocityY) > Math.abs(e.translationY) ||
            e.translationY >= maxHeight / 2
          ) {
            translateY.value = withTiming(maxHeight, { duration: 200 });
            runOnJS(onClose)();
            return;
          }
          translateY.value = withTiming(initialHeight.value, { duration: 200 });
          return;
        }
        if (e.translationY < 0) {
          if (hideHandle) {
            translateY.value = initialHeight.value;
            return;
          }
          translateY.value = initialHeight.value;
        }
      })
      .onFinalize(() => {
        isMove.value = false;
        initialHeight.value = 0;
      })
  ).current;
  return {
    // styleAnimated,
    gesturePan,
  };
};
