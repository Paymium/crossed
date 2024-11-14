/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  Children,
  forwardRef,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  type CrossedMethods,
  composeStyles,
  createStyles,
  inlineStyle,
} from '@crossed/styled';
import {
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
import { composeRefs } from '@crossed/core';
import { sheetStyles } from '../styles';
import { useFloatingContext } from '../Floating/context';
import { useMaxHeight } from './useMaxHeight';
import { ScrollView as SV } from '../../other/ScrollView';
import { SheetTitle } from './Title';
import { SheetFooter } from './Footer';
import { FlatList } from 'react-native';
import { YBox } from '../../layout/YBox';
import { useGesturePan } from './useGesturePan';
import { useGesture } from './useGesture';

const styles = createStyles(({ space, colors }) => ({
  container: {
    base: {
      paddingTop: space.xxs,
      gap: space.md,
    },
    variants: {},
  },
  containerPaddingBottom: { base: { paddingBottom: space.md } },
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
  titleStyles: {
    web: {
      base: {
        background: `linear-gradient(${colors.background.secondary} 90%, transparent)`,
      },
    },
  },
  footer: {
    base: {
      paddingHorizontal: space.md,
      background: `linear-gradient(transparent 10%, ${colors.background.secondary})`,
    },
  },
}));

export type SheetScrollViewProps = Omit<AnimatedScrollViewProps, 'style'> & {
  style?: CrossedMethods<any, any>;
  padded?: boolean;
};

export const ScrollView = forwardRef<
  FlatList<any>,
  PropsWithChildren<Omit<SheetScrollViewProps, 'children'>>
>(({ children, style: styleProps, padded = true }, ref) => {
  const {
    hideHandle,
    snapInitialHeight,
    full,
    stickyFooter,
    stickyHeader,
    detach,
  } = useSheetContext();
  const { open, onClose } = useFloatingContext();

  const scrollRef = useRef<FlatList<any>>(null);

  const isMove = useSharedValue(false);
  const height = useSharedValue(0);
  const heightLayout = useSharedValue(0);
  const scroll = useSharedValue(0);
  const initialHeight = useSharedValue(0);
  const scrollViewEnable = useSharedValue(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);

  const maxHeight = useMaxHeight();

  const native = Gesture.Native();
  const { gesturePan, styleAnimated } = useGesture({
    isMove,
    height,
    scroll,
    initialHeight,
    setScrollEnabled,
    scrollEnabled,
    snapInitialHeight,
    heightLayout,
  });

  useAnimatedReaction(
    () => {
      return snapInitialHeight.value
        ? snapInitialHeight.value
        : heightLayout.value >= maxHeight
          ? maxHeight
          : heightLayout.value;
    },
    (currentValue, previousValue) => {
      if (currentValue !== previousValue) {
        if (open && Math.floor(height.value) !== Math.floor(currentValue)) {
          runOnJS(setScrollEnabled)(currentValue === maxHeight);
          height.value = currentValue;
        }
      }
    },
    [heightLayout, open, maxHeight]
  );

  const onContentSizeChange = useCallback(
    (_w: number, h: number) => {
      heightLayout.value = full ? maxHeight : Math.floor(h);
    },
    [full, maxHeight, heightLayout]
  );

  const onScroll = useAnimatedScrollHandler((e) => {
    scroll.value = e.contentOffset.y;
  });

  const title = useMemo(() => {
    if (!children || typeof children === 'number') return null;
    return Children.toArray(children).find(
      (e) => typeof e === 'object' && 'type' in e && e.type === SheetTitle
    );
  }, [children]);
  const footer = useMemo(() => {
    if (!children) return null;
    return Children.toArray(children).find(
      (e) => typeof e === 'object' && 'type' in e && e.type === SheetFooter
    );
  }, [children]);
  const body = useMemo(() => {
    if (!children) return null;
    return Children.toArray(children).filter(
      (e) =>
        typeof e === 'object' &&
        'type' in e &&
        e.type !== SheetFooter &&
        e.type !== SheetTitle
    );
  }, [children]);

  return (
    <GestureDetector gesture={Gesture.Simultaneous(gesturePan, native)}>
      <SV
        ref={composeRefs(ref, scrollRef)}
        scrollEventThrottle={16}
        scrollEnabled={scrollEnabled}
        onScroll={onScroll}
        onContentSizeChange={onContentSizeChange}
        contentContainerStyle={
          composeStyles(
            padded && styles.container,
            !stickyFooter && styles.containerPaddingBottom,
            padded && styles.containerPadded
          ).style().style
        }
        style={{ zIndex: 1 }}
        containerProps={{
          style: [
            composeStyles(
              sheetStyles.content,
              sheetStyles.padding,
              detach &&
                inlineStyle(({ space }) => ({
                  base: {
                    right: space.xs,
                    left: space.xs,
                    bottom: space.xs,
                    borderBottomLeftRadius: 24,
                    borderBottomRightRadius: 24,
                  },
                })),
              styleProps || false
            ).style().style,
            { zIndex: 1 },
            styleAnimated,
          ],
        }}
        stickyHeader={stickyHeader}
        stickyFooter={stickyFooter}
      >
        <SV.Title>
          <YBox style={styles.titleStyles}>
            {!hideHandle && <Handle />}
            {title}
          </YBox>
        </SV.Title>
        <SV.Body>{body}</SV.Body>
        {Boolean(footer) && <SV.Footer>{footer}</SV.Footer>}
      </SV>
    </GestureDetector>
  );
});

ScrollView.displayName = 'SheetScrollView';
