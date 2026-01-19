/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React from 'react';
import { SectionListProps, SectionList as RNSectionList } from 'react-native';

/**
 * Simplified SectionList for BottomSheet.
 *
 * Note: This is now a simple wrapper around React Native's SectionList.
 * For sheets with scrollable content, set `gestureEnabled={false}` on the BottomSheet
 * to prevent gesture conflicts.
 *
 * Future: Advanced gesture coordination can be added if needed.
 */
type Props<T = any> = SectionListProps<T> &
  React.RefAttributes<RNSectionList> & {
    /**
     * By default refresh control gesture will work in top 15% area of the ScrollView. You can set a different value here.
     *
     * Accepts a value between 0-1.
     *
     * @deprecated This is no longer used in the simplified implementation
     */
    refreshControlGestureArea?: number;
  };

function $SectionList<T>(
  props: Props<T>,
  ref: React.ForwardedRef<RNSectionList>
) {
  const { refreshControlGestureArea, ...restProps } = props;

  // Log deprecation warning if refreshControlGestureArea is used
  if (refreshControlGestureArea !== undefined) {
    console.warn(
      'refreshControlGestureArea is deprecated in the simplified SectionList implementation'
    );
  }

  return <RNSectionList ref={ref} {...(restProps as any)} />;
}

export const SectionList = React.forwardRef(
  $SectionList
) as unknown as typeof RNSectionList;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type SectionList<ItemT = any> = typeof RNSectionList &
  RNSectionList<ItemT>;
