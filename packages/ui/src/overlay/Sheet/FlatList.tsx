/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  ComponentPropsWithoutRef,
  forwardRef,
  memo,
  RefAttributes,
} from 'react';
import { FlatList as FL } from '@crossed/sheet';
import { FlatList as RNFL } from 'react-native';
import { paddedContainerStyle } from './styles';
import '@crossed/sheet';
import 'react-native';

type FlatListProps = ComponentPropsWithoutRef<typeof RNFL<any>> & {
  padded?: boolean;
};
export const FlatList = memo<FlatListProps & RefAttributes<typeof RNFL<any>>>(
  forwardRef(({ padded = true, ...props }, ref) => (
    <FL
      {...(props as any)}
      ref={ref as any}
      contentContainerStyle={paddedContainerStyle(padded).style().style}
    />
  ))
);
FlatList.displayName = 'Sheet.FlatList';
