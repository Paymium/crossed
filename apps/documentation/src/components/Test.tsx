/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { FlatListProps } from 'react-native';
import { FlatList } from './FlatList';
import { PropsWithChildren } from 'react';

export const Test = ({
  children,
  ...props
}: Omit<PropsWithChildren<FlatListProps<any>>, 'data' | 'renderItem'>) => {
  return (
    <FlatList
      data={[]}
      {...props}
      renderItem={() => {
        return null;
      }}
    />
  );
};
