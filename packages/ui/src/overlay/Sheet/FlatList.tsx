/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentProps, forwardRef, memo, RefAttributes } from 'react';
import { FlatList as FL } from 'react-native-actions-sheet';
import { FlatList as RNFL } from 'react-native';
import { paddedContainerStyle } from './styles';

type FlatListProps = ComponentProps<typeof FL> & {
  padded?: boolean;
};
export const FlatList = memo<FlatListProps & RefAttributes<RNFL>>(
  forwardRef<RNFL, FlatListProps>(({ padded = true, ...props }, ref) => (
    <FL
      {...props}
      ref={ref}
      contentContainerStyle={paddedContainerStyle(padded).style().style}
    />
  ))
);
FlatList.displayName = 'Sheet.FlatList';
