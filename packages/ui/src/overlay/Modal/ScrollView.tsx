/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentProps, memo, useContext } from 'react';
import { ScrollView as RNScrollView } from 'react-native';
import { localContext } from './context';
import { Sheet } from '../Sheet';
import { CrossedMethods } from '@crossed/styled';

type ModalScrollViewProps = Omit<
  ComponentProps<typeof RNScrollView>,
  'style' | 'contentContainerStyle'
> & {
  contentContainerStyle?: CrossedMethods<any>;
  style?: CrossedMethods<any>;
};
export const ModalScrollView = memo((props: ModalScrollViewProps) => {
  const { showSheet } = useContext(localContext);

  return showSheet ? (
    <Sheet.ScrollView {...props} />
  ) : (
    <RNScrollView
      {...props}
      style={props.style?.style().style}
      contentContainerStyle={props.contentContainerStyle?.style().style}
    />
  );
});
