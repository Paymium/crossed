/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React, { useRef } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

export type DraggableNodeOptions = {
  hasRefreshControl?: boolean;
  refreshControlBoundary?: number;
};

export const ScrollState = {
  END: -1,
};

export function resolveScrollRef(ref: any) {
  // FlatList
  if (ref.current?._listRef) {
    return ref.current._listRef?._scrollRef;
  }
  // FlashList
  if (ref.current?.rlvRef) {
    return ref.current?.rlvRef?._scrollComponent?._scrollViewRef;
  }
  // SectionList
  if (ref.current?._wrapperListRef?._listRef?._scrollRef) {
    return ref.current?._wrapperListRef?._listRef?._scrollRef;
  }
  // ScrollView
  return ref.current;
}

/**
 * Create a custom scrollable view inside the action sheet.
 *
 * @example
 * ```tsx
 const handlers = useScrollHandlers<RNScrollView>();
 return <ScrollableView {...handlers} />
 * ```
 */
export function useScrollHandlers<T>(_options?: DraggableNodeOptions) {
  const nodeRef = useRef<T>(null);
  const offset = useRef({ x: 0, y: 0 });

  const memoizedProps = React.useMemo(() => {
    return {
      ref: nodeRef,
      onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { x, y } = event.nativeEvent.contentOffset;
        const { width, height } = event.nativeEvent.contentSize;
        const { width: layoutWidth, height: layoutHeight } =
          event.nativeEvent.layoutMeasurement;

        const maxOffsetX = width - layoutWidth;
        const maxOffsetY = height - layoutHeight;

        offset.current = {
          x: x === maxOffsetX || x > maxOffsetX - 5 ? ScrollState.END : x,
          y: y === maxOffsetY || y > maxOffsetY - 5 ? ScrollState.END : y,
        };
      },
      onLayout: () => {},
    };
  }, [nodeRef, offset]);

  return memoizedProps;
}
