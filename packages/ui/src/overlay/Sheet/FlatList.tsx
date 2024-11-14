/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { forwardRef, memo } from 'react';
import { Frame } from './Frame';
import { sheetStyles } from '../styles';
import Animated from 'react-native-reanimated';
import { useSheetContext } from './context';
import { composeStyles, inlineStyle } from '@crossed/styled';
import { FlatList, FlatListProps } from '../../other/ScrollView/FlatList';
import { useAnimateLogic } from './useAnimateLogic';

export const SheetFlatList = memo(
  forwardRef<Animated.FlatList<any>, FlatListProps<any>>((props, flatRef) => {
    const { detach } = useSheetContext();
    const { animatedStyle, ref } = useAnimateLogic();

    return (
      <Frame
        ref={ref}
        style={composeStyles(sheetStyles.content, detach && sheetStyles.detach)}
        animatedStyle={animatedStyle}
      >
        <FlatList
          ref={flatRef}
          {...props}
          containerProps={{
            style: composeStyles(inlineStyle(() => ({ base: { flex: 1 } }))),
          }}
          style={composeStyles(sheetStyles.padding, props.style)}
        />
      </Frame>
    );
  })
);
