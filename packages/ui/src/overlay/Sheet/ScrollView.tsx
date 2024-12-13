/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentProps, forwardRef, memo, RefAttributes } from 'react';
import { Content, ContentProps } from './Content';
import { ScrollView as SV } from 'react-native-actions-sheet';
import { ScrollView as RNSV } from 'react-native';
import { paddedContainerStyle } from './styles';

type ScrollViewProps = ComponentProps<typeof SV> & {
  contentProps?: ContentProps;
  padded?: boolean;
};

export const ScrollView = memo<ScrollViewProps & RefAttributes<RNSV>>(
  forwardRef<RNSV, ScrollViewProps>(({ padded = true, ...props }, ref) => {
    return (
      <Content padded={false} useBottomSafeAreaPadding>
        <SV
          {...(props as any)}
          ref={ref}
          contentContainerStyle={paddedContainerStyle(padded).style().style}
        />
      </Content>
    );
  })
);
ScrollView.displayName = 'Sheet.ScrollView';
