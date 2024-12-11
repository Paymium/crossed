/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentProps, memo } from 'react';
import { Content } from './Content';
import { FlatList as FL } from 'react-native-actions-sheet';
import { paddedContainerStyle } from './styles';

type FlatListProps = ComponentProps<typeof FL> & { padded?: boolean };
export const FlatList = memo(({ padded = true, ...props }: FlatListProps) => (
  <Content padded={false}>
    <FL
      {...props}
      contentContainerStyle={paddedContainerStyle(padded).style().style}
    />
  </Content>
));
FlatList.displayName = 'Sheet.FlatList';
