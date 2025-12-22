/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React, {
  RefObject,
  useImperativeHandle,
} from 'react';
import { Platform, SectionListProps, SectionList as RNSectionList } from 'react-native';
import { BottomSheetSectionList } from '@gorhom/bottom-sheet';
import { useScrollHandlers } from '../hooks/use-scroll-handlers';

type Props<T = any> = SectionListProps<T> &
  React.RefAttributes<RNSectionList> & {
    /**
     * By default refresh control gesture will work in top 15% area of the ScrollView. You can set a different value here.
     *
     * Accepts a value between 0-1.
     */
    refreshControlGestureArea?: number;
  };

function $SectionList<T>(
  props: Props<T>,
  ref: React.ForwardedRef<RefObject<RNSectionList>>
) {
  const handlers = useScrollHandlers<RNSectionList>({
    hasRefreshControl: !!props.refreshControl,
    refreshControlBoundary: props.refreshControlGestureArea || 0.15,
  });
  useImperativeHandle(ref, () => handlers.ref);

  // Use native SectionList for web, BottomSheetSectionList for native
  const ScrollComponent = Platform.OS === 'web' ? RNSectionList : BottomSheetSectionList;

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

export const SectionList = React.forwardRef(
  $SectionList
) as unknown as typeof RNSectionList;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type FlatList<ItemT = any> = typeof RNSectionList & RNSectionList<ItemT>;
