/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  FlashList as SPFlashList,
  FlashListProps,
  MasonryFlashList as SPMasonaryFlashList,
  MasonryFlashListProps,
} from '@shopify/flash-list';
import React from 'react';
import { ScrollView as RNScrollView } from 'react-native';
import { NativeViewGestureHandlerProps } from 'react-native-gesture-handler';
import { ScrollView as SheetScrollView } from './ScrollView';
type Props<T = any> = FlashListProps<T> &
  Partial<NativeViewGestureHandlerProps> &
  React.RefAttributes<RNScrollView> & {
    /**
     * By default refresh control gesture will work in top 15% area of the ScrollView. You can set a different value here.
     *
     * Accepts a value between 0-1.
     */
    refreshControlGestureArea?: number;
  };

function $FlashList<T = any>(
  props: Props<T>,
  ref: React.ForwardedRef<SPFlashList<T>>
) {
  return (
    <SPFlashList
      {...props}
      ref={ref}
      bounces={false}
      renderScrollComponent={SheetScrollView as any}
    />
  );
}

export const FlashList = React.forwardRef(
  $FlashList
) as unknown as typeof SPFlashList;

type MasonaryProps<T = any> = MasonryFlashListProps<T> &
  Partial<NativeViewGestureHandlerProps> &
  React.RefAttributes<RNScrollView> & {
    /**
     * By default refresh control gesture will work in top 15% area of the ScrollView. You can set a different value here.
     *
     * Accepts a value between 0-1.
     */
    refreshControlGestureArea?: number;
  };

function $MasonaryFlashList<T = any>(
  props: MasonaryProps<T>,
  ref: React.ForwardedRef<any>
) {
  return (
    <SPMasonaryFlashList
      {...props}
      ref={ref as any}
      bounces={false}
      renderScrollComponent={SheetScrollView as any}
    />
  );
}

export const MasonaryFlashList = React.forwardRef(
  $MasonaryFlashList
) as unknown as typeof SPMasonaryFlashList;
