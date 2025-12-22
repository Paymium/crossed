/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React, { RefObject, useImperativeHandle } from 'react';
import {
  Platform,
  ScrollView as RNScrollView,
  ScrollViewProps,
} from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useScrollHandlers } from '../hooks/use-scroll-handlers';

type Props = ScrollViewProps &
  React.RefAttributes<RNScrollView> & {
    /**
     * By default refresh control gesture will work in top 15% area of the ScrollView. You can set a different value here.
     *
     * Accepts a value between 0-1.
     */
    refreshControlGestureArea?: number;
  };

function $ScrollView(
  props: Props,
  ref: React.ForwardedRef<RefObject<RNScrollView>>
) {
  const handlers = useScrollHandlers<RNScrollView>({
    hasRefreshControl: !!props.refreshControl,
    refreshControlBoundary: props.refreshControlGestureArea || 0.15,
  });
  useImperativeHandle(ref, () => handlers.ref);

  // Use native ScrollView for web, BottomSheetScrollView for native
  const ScrollComponent = Platform.OS === 'web' ? RNScrollView : BottomSheetScrollView;

  return (
    <ScrollComponent
      {...props}
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

export const ScrollView = React.forwardRef(
  $ScrollView
) as unknown as typeof RNScrollView;
