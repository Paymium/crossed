/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentProps, memo } from 'react';
import { Content, ContentProps } from './Content';
import { FlatList as FL } from 'react-native-actions-sheet';
import { paddedContainerStyle } from './styles';

type FlatListProps = ComponentProps<typeof FL> & {
  padded?: boolean;
  contentProps?: ContentProps;
};
export const FlatList = memo(
  ({ padded = true, contentProps, ...props }: FlatListProps) => (
    <Content padded={false} {...contentProps}>
      <FL
        {...props}
        contentContainerStyle={paddedContainerStyle(padded).style().style}
      />
    </Content>
  )
);
FlatList.displayName = 'Sheet.FlatList';
