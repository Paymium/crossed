/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { forwardRef, useCallback, useMemo, useRef } from 'react';
import {
  type CrossedMethods,
  composeStyles,
  createStyles,
  isWeb,
} from '@crossed/styled';
import Animated, {
  type AnimatedScrollViewProps,
  runOnJS,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSheetContext } from './context';
import { Handle } from './Handle';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useWindowDimensions } from 'react-native';
import { composeRefs } from '@crossed/core';
import { useDebouncedCallback } from 'use-debounce';

const styles = createStyles(({ colors, space }) => ({
  box: {
    base: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: colors.background.secondary,
      zIndex: 100000,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      maxHeight: '100%',
    },
    variants: {},
  },
  container: {
    base: {
      paddingBottom: space.md,
      paddingTop: space.xxs,
    },
    variants: {},
  },
  containerPadded: {
    base: {
      paddingHorizontal: space.md,
    },
    variants: {},
  },
  fixed: {
    web: { base: { position: 'fixed' as any, boxSizing: 'content-box' } },
  },
  maxHeight: { base: { maxHeight: '100%' } },
}));

export type SheetScrollViewProps = Omit<AnimatedScrollViewProps, 'style'> & {
  style?: CrossedMethods<any, any>;
  padded?: boolean;
};

export const ScrollView = forwardRef<Animated.ScrollView, SheetScrollViewProps>(
  ({ children, style: styleProps, padded = true, ...props }, ref) => {
    const {
      open,
      isMove,
      hideHandle,
      height,
      onClose,
      snapInitialHeight,
      offset,
    } = useSheetContext();
    const { height: heightDimensions } = useWindowDimensions();

    const scrollRef = useRef<Animated.ScrollView>(null);

    const heightLayout = useSharedValue(0);
    const scroll = useSharedValue(0);
    const initialHeight = useSharedValue(0);
    const scrollViewEnable = useSharedValue(false);

    const maxHeight = useMemo(
      () => heightDimensions - offset,
      [heightDimensions, offset]
    );

    const styleAnimated = useAnimatedStyle(() => {
      const duration = 300;
      return {
        height: withTiming(height.value, {
          duration: isMove.value ? 0 : duration,
        }),
        ...(isWeb
          ? height.value === maxHeight
            ? { touchAction: 'auto', overflowY: 'auto' }
            : { touchAction: 'none', overflowY: 'hidden' }
          : {}),
      };
    }, [height, isMove, maxHeight]);

    const handleClose = useCallback(() => {
      onClose();
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    }, [onClose]);

    useAnimatedReaction(
      () => {
        return snapInitialHeight.value
          ? snapInitialHeight.value
          : heightLayout.value >= maxHeight
            ? maxHeight
            : heightLayout.value;
      },
      (currentValue) => {
        if (open && Math.floor(height.value) !== Math.floor(currentValue)) {
          scrollViewEnable.value = currentValue === maxHeight;
          height.value = currentValue;
        } else if (!open && scroll.value !== 0 && scrollRef.current) {
          runOnJS(scrollRef.current.scrollTo)({ y: 0, animated: false });
        }
      },
      [open]
    );

    const native = Gesture.Native();
    const gesturePan = Gesture.Pan()
      .onTouchesDown(() => {
        isMove.value = true;
        initialHeight.value = height.value;

        scrollViewEnable.value = initialHeight.value === maxHeight;
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
        if (
          scroll.value <= 0 &&
          !isMax &&
          e.changeY > 0 &&
          scrollViewEnable.value
        ) {
          scrollViewEnable.value = false;
          return;
        }

        if (!scrollViewEnable.value && isMax) {
          scrollViewEnable.value = true;
        }
      })
      .onEnd((e) => {
        if (e.translationY > 0 && scroll.value <= 0) {
          if (
            Math.abs(e.velocityY) > Math.abs(e.translationY) ||
            e.translationY >= initialHeight.value / 2
          ) {
            runOnJS(handleClose)();
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
          scrollViewEnable.value = true;
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
      });

    const onContentSizeChange = useDebouncedCallback(
      (_w: number, h: number) => {
        heightLayout.value = Math.floor(h);
      },
      100
    );

    const onScroll = useAnimatedScrollHandler((e) => {
      scroll.value = e.contentOffset.y;
    });

    const animatedProps = useAnimatedProps(() => {
      return {
        scrollEnabled: scrollViewEnable.value,
      };
    }, [scrollViewEnable]);

    return (
      <GestureDetector gesture={Gesture.Simultaneous(native, gesturePan)}>
        <Animated.ScrollView
          ref={composeRefs(ref, scrollRef)}
          scrollEventThrottle={16}
          animatedProps={animatedProps}
          onScroll={onScroll}
          onContentSizeChange={onContentSizeChange}
          contentContainerStyle={
            composeStyles(
              padded && styles.container,
              padded && styles.containerPadded
            ).style().style
          }
          {...props}
          style={[
            composeStyles(
              styles.box,
              isWeb && styles.fixed,
              styleProps || false
            ).style().style,
            styleAnimated,
          ]}
        >
          {!hideHandle && <Handle />}
          {children as React.ReactNode}
        </Animated.ScrollView>
      </GestureDetector>
    );
  }
);

ScrollView.displayName = 'SheetScrollView';
