import { useEffect, useRef } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import { useMaxHeight } from './useMaxHeight';
import { useSheetContext } from './context';
import { runOnJS, useAnimatedReaction, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useFloatingContext } from '../Floating/context';

export const useGesturePan = ({
  isMove,
  height,
  scroll,
  initialHeight,
  setScrollEnabled,
  scrollEnabled,
  snapInitialHeight,
  heightLayout
}) => {
  const maxHeight = useMaxHeight();
  const { open, onClose } = useFloatingContext();
  const { hideHandle } = useSheetContext();
  useEffect(() => {
    if (!open) {
      height.value = 0;
    }
  }, [open]);

  const styleAnimated = useAnimatedStyle(() => {
    const duration = 300;
    return {
      height: withTiming(height.value, {
        duration: isMove.value ? 0 : duration,
      }),
    };
  }, [height, isMove]);
  const gesturePan = useRef(
    Gesture.Pan()
      .onTouchesDown(() => {
        isMove.value = true;
        initialHeight.value = height.value;
        runOnJS(setScrollEnabled)(initialHeight.value === maxHeight);
      })
      .onChange((e) => {
        const newHeight =
          height.value - (hideHandle ? e.changeY / 3 : e.changeY);

        if (
          scroll.value <= 0 &&
          (height.value !== maxHeight || e.changeY > 0)
        ) {
          height.value = newHeight <= maxHeight ? newHeight : maxHeight;
        }

        const isMax = height.value === maxHeight;
        if (scroll.value <= 0 && !isMax && e.changeY > 0 && scrollEnabled) {
          runOnJS(setScrollEnabled)(false);
          return;
        }
        if (isMax) {
          runOnJS(setScrollEnabled)(true);
        }
      })
      .onEnd((e) => {
        if (e.translationY > 0 && scroll.value <= 0) {
          if (
            Math.abs(e.velocityY) > Math.abs(e.translationY) ||
            e.translationY >= initialHeight.value / 2
          ) {
            console.log('ici', e.velocityY, e.translationY);
            runOnJS(onClose)();
            return;
          }
          height.value = initialHeight.value;
          return;
        }

        if (e.translationY < 0) {
          if (hideHandle) {
            height.value = initialHeight.value;
            return;
          }
          runOnJS(setScrollEnabled)(true);
          if (
            Math.abs(e.velocityY) > Math.abs(e.translationY) ||
            height.value >= initialHeight.value + initialHeight.value / 2
          ) {
            height.value = maxHeight;
            return;
          }
          height.value = initialHeight.value;
        }
      })
      .onFinalize(() => {
        isMove.value = false;
        initialHeight.value = 0;
      })
  ).current;
  return {
    styleAnimated,
    gesturePan,
  };
};
