/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentProps, memo } from 'react';
import { Content, ContentProps } from './Content';
import { ScrollView as SV } from 'react-native-actions-sheet';
import { paddedContainerStyle } from './styles';

type ScrollViewProps = ComponentProps<typeof SV> & {
  contentProps?: ContentProps;
  padded?: boolean;
};

export const ScrollView = memo(
  ({ padded = true, ...props }: ScrollViewProps) => {
    return (
      <Content padded={false} useBottomSafeAreaPadding>
        <SV
          {...(props as any)}
          contentContainerStyle={paddedContainerStyle(padded).style().style}
        />
      </Content>
    );
  }
);
ScrollView.displayName = 'Sheet.ScrollView';
