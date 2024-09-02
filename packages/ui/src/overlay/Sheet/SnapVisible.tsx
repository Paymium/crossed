/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeEventHandlers } from '@crossed/core';
import { YBox, type YBoxProps } from '../../layout/YBox';
import { useCallback } from 'react';
import { type LayoutChangeEvent } from 'react-native';
import { useSheetContext } from './context';

export const SnapVisible = (props: YBoxProps) => {
  const { snapInitialHeight, offset } = useSheetContext();
  const onLayout = useCallback(
    ({ nativeEvent }: LayoutChangeEvent) => {
      const OFFSET = nativeEvent.layout.height + 40 + offset;

      if (Math.floor(snapInitialHeight.value) !== Math.floor(OFFSET))
        snapInitialHeight.value = OFFSET;
    },
    [snapInitialHeight, offset]
  );

  return (
    <YBox
      {...props}
      onLayout={composeEventHandlers(onLayout, props.onLayout)}
    />
  );
};
