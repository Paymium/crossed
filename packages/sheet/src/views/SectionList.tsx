/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React, {
  PropsWithChildren,
  RefAttributes,
  RefObject,
  useImperativeHandle,
} from 'react';
import { SectionListProps, SectionList as RNSectionList } from 'react-native';
import {
  NativeViewGestureHandlerProps,
  RefreshControl,
  ScrollView,
} from 'react-native-gesture-handler';
import { useScrollHandlers } from '../hooks/use-scroll-handlers';
import { nativeViewProps } from 'react-native-gesture-handler/src/handlers/NativeViewGestureHandler';

type Props<T = any> = SectionListProps<T> &
  Partial<NativeViewGestureHandlerProps> &
  React.RefAttributes<RNSectionList> & {
    /**
     * By default refresh control gesture will work in top 15% area of the ScrollView. You can set a different value here.
     *
     * Accepts a value between 0-1.
     */
    refreshControlGestureArea?: number;
  };

export const RNGHSectionList = <T = any,>(
  props: PropsWithChildren<
    Omit<SectionListProps<T>, 'renderScrollComponent'> &
      RefAttributes<RNSectionList<T>> &
      NativeViewGestureHandlerProps
  >,
  ref: React.ForwardedRef<RefObject<RNSectionList>>
) => {
  const refreshControlGestureRef = React.useRef<RefreshControl>(null);
  const { waitFor, refreshControl, ...rest } = props;

  const flatListProps: any = {};
  const scrollViewProps: any = {};
  for (const [propName, value] of Object.entries(rest)) {
    // https://github.com/microsoft/TypeScript/issues/26255
    if ((nativeViewProps as readonly string[]).includes(propName)) {
      scrollViewProps[propName] = value;
    } else {
      flatListProps[propName] = value;
    }
  }

  return (
    <RNSectionList
      ref={ref}
      {...(flatListProps as any)}
      scrollEventThrottle={1}
      renderScrollComponent={(scrollProps) => (
        <ScrollView
          {...{
            ...scrollProps,
            ...scrollViewProps,
            waitFor: [...toArray(waitFor ?? []), refreshControlGestureRef],
          }}
        />
      )}
      refreshControl={
        refreshControl
          ? React.cloneElement(refreshControl, {
              ref: refreshControlGestureRef,
            } as any)
          : undefined
      }
    />
  );
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

  return (
    <RNGHSectionList
      {...(props as any)}
      {...handlers}
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

export const SectionList = React.forwardRef(
  $SectionList
) as unknown as typeof RNSectionList;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type FlatList<ItemT = any> = typeof RNSectionList & RNSectionList<ItemT>;

function toArray<T>(object: T | T[]): T[] {
  if (!Array.isArray(object)) {
    return [object];
  }

  return object;
}
