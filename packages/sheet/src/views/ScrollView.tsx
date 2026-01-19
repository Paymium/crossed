/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React from 'react';
import { ScrollView as RNScrollView, ScrollViewProps } from 'react-native';

/**
 * Simplified ScrollView for BottomSheet.
 *
 * Note: This is now a simple wrapper around React Native's ScrollView.
 * For sheets with scrollable content, set `gestureEnabled={false}` on the BottomSheet
 * to prevent gesture conflicts.
 *
 * Future: Advanced gesture coordination can be added if needed.
 */
type Props = ScrollViewProps &
  React.RefAttributes<RNScrollView> & {
    /**
     * By default refresh control gesture will work in top 15% area of the ScrollView. You can set a different value here.
     *
     * Accepts a value between 0-1.
     *
     * @deprecated This is no longer used in the simplified implementation
     */
    refreshControlGestureArea?: number;
  };

function $ScrollView(props: Props, ref: React.ForwardedRef<RNScrollView>) {
  const { refreshControlGestureArea, ...restProps } = props;

  // Log deprecation warning if refreshControlGestureArea is used
  if (refreshControlGestureArea !== undefined) {
    console.warn(
      'refreshControlGestureArea is deprecated in the simplified ScrollView implementation'
    );
  }

  return <RNScrollView ref={ref} {...restProps} />;
}

export const ScrollView = React.forwardRef(
  $ScrollView
) as unknown as typeof RNScrollView;
