/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React, { RefObject, useImperativeHandle } from 'react';
import { FlatListProps, Platform, FlatList as RNFlatList } from 'react-native';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useScrollHandlers } from '../hooks/use-scroll-handlers';

type Props<T = any> = FlatListProps<T> &
  React.RefAttributes<RNFlatList> & {
    /**
     * By default refresh control gesture will work in top 15% area of the ScrollView. You can set a different value here.
     *
     * Accepts a value between 0-1.
     */
    refreshControlGestureArea?: number;
  };

function $FlatList<T>(
  props: Props<T>,
  ref: React.ForwardedRef<RefObject<RNFlatList>>
) {
  const handlers = useScrollHandlers<RNFlatList>({
    hasRefreshControl: !!props.refreshControl,
    refreshControlBoundary: props.refreshControlGestureArea || 0.15,
  });
  useImperativeHandle(ref, () => handlers.ref);

  // Use native FlatList for web, BottomSheetFlatList for native
  const ScrollComponent = Platform.OS === 'web' ? RNFlatList : BottomSheetFlatList;

  return (
    <ScrollComponent
      {...(props as any)}
      ref={handlers.ref as any}
      onScroll={(event) => {
        handlers.onScroll(event);
        props.onScroll?.(event);
      }}
      onLayout={(event) => {
        handlers.onLayout();
        props.onLayout?.(event);
      }}
    />
  );
}

export const FlatList = React.forwardRef(
  $FlatList
) as unknown as typeof RNFlatList;
