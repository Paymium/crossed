/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React, { RefAttributes, useImperativeHandle } from 'react';
import { FlatListProps, Platform, FlatList as RNFlatList } from 'react-native';
import {
  NativeViewGestureHandlerProps,
  FlatList as RNGHFlatList,
} from 'react-native-gesture-handler';
import { useScrollHandlers } from '../hooks/use-scroll-handlers';
type Props<T = any> = FlatListProps<T> &
  Partial<NativeViewGestureHandlerProps> &
  React.RefAttributes<RNFlatList> & {
    /**
     * By default refresh control gesture will work in top 15% area of the ScrollView. You can set a different value here.
     *
     * Accepts a value between 0-1.
     */
    refreshControlGestureArea?: number;
  };

function $FlatList<T>(props: Props<T> & RefAttributes<RNFlatList>) {
  const handlers = useScrollHandlers<RNFlatList>({
    hasRefreshControl: !!props.refreshControl,
    refreshControlBoundary: props.refreshControlGestureArea || 0.15,
  });
  useImperativeHandle(props.ref, () => (handlers as any).ref);
  const ScrollComponent = (
    Platform.OS === 'web' ? RNFlatList : RNGHFlatList
  ) as any;

  return (
    <ScrollComponent
      {...(props as any)}
      {...(handlers as any)}
      onScroll={(event) => {
        handlers.onScroll(event);
        props.onScroll?.(event);
      }}
      bounces={false}
      onLayout={(event) => {
        handlers.onLayout();
        props.onLayout?.(event);
      }}
      scrollEventThrottle={1}
    />
  );
}

export const FlatList = React.forwardRef(
  $FlatList
) as unknown as typeof RNFlatList;
