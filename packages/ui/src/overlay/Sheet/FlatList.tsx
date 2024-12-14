/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentProps, forwardRef, memo, RefAttributes } from 'react';
import { Content, ContentProps } from './Content';
import { FlatList as FL } from 'react-native-actions-sheet';
import { FlatList as RNFL } from 'react-native';
import { paddedContainerStyle } from './styles';

type FlatListProps = ComponentProps<typeof FL> & {
  padded?: boolean;
  contentProps?: ContentProps;
};
export const FlatList = memo<FlatListProps & RefAttributes<RNFL>>(
  forwardRef<RNFL, FlatListProps>(
    ({ padded = true, contentProps, children, ...props }, ref) => (
      <Content padded={false} {...contentProps}>
        {children}
        <FL
          {...props}
          ref={ref}
          contentContainerStyle={paddedContainerStyle(padded).style().style}
        />
      </Content>
    )
  )
);
FlatList.displayName = 'Sheet.FlatList';
