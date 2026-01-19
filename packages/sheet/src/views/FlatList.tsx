/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React from 'react';
import { FlatListProps, FlatList as RNFlatList } from 'react-native';

/**
 * Simplified FlatList for BottomSheet.
 *
 * Note: This is now a simple wrapper around React Native's FlatList.
 * For sheets with scrollable content, set `gestureEnabled={false}` on the BottomSheet
 * to prevent gesture conflicts.
 *
 * Future: Advanced gesture coordination can be added if needed.
 */
type Props<T = any> = FlatListProps<T> &
  React.RefAttributes<RNFlatList> & {
    /**
     * By default refresh control gesture will work in top 15% area of the ScrollView. You can set a different value here.
     *
     * Accepts a value between 0-1.
     *
     * @deprecated This is no longer used in the simplified implementation
     */
    refreshControlGestureArea?: number;
  };

function $FlatList<T>(props: Props<T>, ref: React.ForwardedRef<RNFlatList>) {
  const { refreshControlGestureArea, ...restProps } = props;

  // Log deprecation warning if refreshControlGestureArea is used
  if (refreshControlGestureArea !== undefined) {
    console.warn(
      'refreshControlGestureArea is deprecated in the simplified FlatList implementation'
    );
  }

  return <RNFlatList ref={ref} {...(restProps as any)} />;
}

export const FlatList = React.forwardRef(
  $FlatList
) as unknown as typeof RNFlatList;
