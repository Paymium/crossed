/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { FlatList as NFlatList, FlatListProps } from 'react-native';

export const FlatList = <T,>(props: FlatListProps<T>) => (
  <NFlatList {...props} />
);
