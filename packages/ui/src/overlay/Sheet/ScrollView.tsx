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
import { ScrollView as SV } from '@crossed/sheet';
import { ScrollView as RNSV } from 'react-native';
import { CrossedMethods } from '@crossed/styled';

type ScrollViewProps = Omit<
  ComponentPropsWithoutRef<typeof RNSV>,
  'contentContainerStyle' | 'style'
> & {
  contentContainerStyle?: CrossedMethods<any>;
  style?: CrossedMethods<any>;
};

export const ScrollView = memo<ScrollViewProps & RefAttributes<typeof RNSV>>(
  forwardRef((props, ref) => {
    return (
      <SV
        {...(props as any)}
        ref={ref}
        style={props.style?.style().style}
        contentContainerStyle={props.contentContainerStyle?.style().style}
      />
    );
  })
);
ScrollView.displayName = 'Sheet.ScrollView';
