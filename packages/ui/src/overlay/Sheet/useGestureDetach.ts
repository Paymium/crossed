import { useEffect, useRef } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import { useMaxHeight } from './useMaxHeight';
import { useSheetContext } from './context';
import {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useFloatingContext } from '../Floating/context';

export const useGestureDetach = ({
  isMove,
  height,
  scroll,
  initialHeight,
  setScrollEnabled,
  scrollEnabled,
  // snapInitialHeight,
  heightLayout,
}) => {
  const initialY = useSharedValue(0);
  const maxHeight = useMaxHeight();
  const yPosition = useSharedValue(maxHeight);
  const { open, onClose } = useFloatingContext();
  const { hideHandle } = useSheetContext();
  const styleAnimated = useAnimatedStyle(() => {
    console.log("useAnimatedStyle", yPosition.value, height.value)
    return {
      transform: [{ translateY: yPosition.value }],
    };
  }, [yPosition]);

  useEffect(() => {
    if (!open) {
      yPosition.value = withTiming(height.value);
    }
  }, [open]);

  useAnimatedReaction(
    () => height.value,
    (currentValue, previousValue) => {
      if (currentValue && currentValue !== previousValue) {
        console.log("useAnimatedReaction", open ? 0 : height.value)
        yPosition.value = withTiming(open ? 0 : height.value);
      }
    },
    [height, open, yPosition]
  );

  const gesturePan = useRef(
    Gesture.Pan()
      .onTouchesDown(() => {
        // isMove.value = true;
        initialY.value = yPosition.value;
        // runOnJS(setScrollEnabled)(initialHeight.value === maxHeight);
      })
      .onChange((e) => {
        const newHeight =
          height.value - (hideHandle ? e.changeY / 3 : e.changeY);
        yPosition.value = initialY.value + e.translationY;
        // if (
        //   scroll.value <= 0 &&
        //   (height.value !== maxHeight || e.changeY > 0)
        // ) {
        //   height.value = newHeight <= maxHeight ? newHeight : maxHeight;
        // }

        const isMax = height.value === maxHeight;
        if (scroll.value <= 0 && !isMax && e.changeY > 0 && scrollEnabled) {
          runOnJS(setScrollEnabled)(false);
          // return;
        }
        if (isMax) {
          runOnJS(setScrollEnabled)(true);
        }
      })
      .onEnd((e) => {
        // render initial position
        if (yPosition.value < 0 || yPosition.value < height.value / 2) {
          yPosition.value = withTiming(0);
        }

        // close if translation greater than height content or velocity
        if (
          e.velocityY > e.translationY ||
          yPosition.value > height.value / 2
        ) {
          console.log('onEnd', Math.abs(e.velocityY) > Math.abs(e.translationY));
          yPosition.value = withTiming(height.value)
          runOnJS(onClose)();
        }
        // if (e.translationY > 0 && scroll.value <= 0) {
        //   if (
        //     Math.abs(e.velocityY) > Math.abs(e.translationY) ||
        //     e.translationY >= initialHeight.value / 2
        //   ) {
        //     console.log('ici', e.velocityY, e.translationY);
        //     runOnJS(onClose)();
        //     return;
        //   }
        //   height.value = initialHeight.value;
        //   return;
        // }

        // if (e.translationY < 0) {
        //   if (hideHandle) {
        //     height.value = initialHeight.value;
        //     return;
        //   }
        //   runOnJS(setScrollEnabled)(true);
        //   if (
        //     Math.abs(e.velocityY) > Math.abs(e.translationY) ||
        //     height.value >= initialHeight.value + initialHeight.value / 2
        //   ) {
        //     height.value = maxHeight;
        //     return;
        //   }
        //   height.value = initialHeight.value;
        // }
      })
      .onFinalize(() => {
        initialY.value = 0;
      })
  ).current;
  return {
    styleAnimated,
    gesturePan,
  };
};
