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
import { paddedContainerStyle } from './styles';

type ScrollViewProps = ComponentPropsWithoutRef<typeof RNSV> & {
  padded?: boolean;
};

export const ScrollView = memo<ScrollViewProps & RefAttributes<typeof RNSV>>(
  forwardRef(({ padded = true, ...props }, ref) => {
    return (
      <SV
        {...(props as any)}
        ref={ref}
        contentContainerStyle={paddedContainerStyle(padded).style().style}
      />
    );
  })
);
ScrollView.displayName = 'Sheet.ScrollView';
