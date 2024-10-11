/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { forwardRef, useCallback } from 'react';
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
import { sheetStyles } from '../styles';
import { useFloatingContext } from '../Floating/context';
import { useMaxHeight } from './useMaxHeight';

const styles = createStyles(({ space }) => ({
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
    const { isMove, hideHandle, height, scrollRef, snapInitialHeight, full } =
      useSheetContext();
    const { open, onClose } = useFloatingContext();
    const { height: heightDimensions } = useWindowDimensions();

    const heightLayout = useSharedValue(0);
    const scroll = useSharedValue(0);
    const initialHeight = useSharedValue(0);
    const scrollViewEnable = useSharedValue(false);

    const maxHeight = useMaxHeight();

    const styleAnimated = useAnimatedStyle(() => {
      const duration = 300;
      console.log('useAnimatedStyle', height.value);
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

    useAnimatedReaction(
      () => {
        return heightLayout.value;
      },
      (currentValue, previousValue) => {
        if (currentValue !== previousValue) {
          const v = snapInitialHeight.value
            ? snapInitialHeight.value
            : heightLayout.value >= maxHeight
              ? maxHeight
              : heightLayout.value;
          if (open && Math.floor(height.value) !== Math.floor(v)) {
            scrollViewEnable.value = v === maxHeight;
            height.value = v;
          } else if (!open && scroll.value !== 0 && scrollRef.current) {
            runOnJS(scrollRef.current.scrollTo)({ y: 0, animated: false });
          }
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

    const onContentSizeChange = useCallback(
      (_w: number, h: number) => {
        console.log({
          heightDimensions,
          h: Math.floor(h),
          result: full ? heightDimensions : Math.floor(h),
        });
        heightLayout.value = full ? heightDimensions : Math.floor(h);
      },
      [full, heightDimensions]
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
            composeStyles(sheetStyles.content, styleProps || false).style()
              .style,
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
