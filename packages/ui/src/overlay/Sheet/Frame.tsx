/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { forwardRef } from 'react';
import { useSheetContext } from './context';
import Animated, { runOnJS, useSharedValue } from 'react-native-reanimated';
import { sheetContext } from './context';
import { ScrollView, type SheetScrollViewProps } from './ScrollView';
import { Floating } from '../Floating';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useMaxHeight } from './useMaxHeight';
import { useFloatingContext } from '../Floating/context';

export type FrameProps = SheetScrollViewProps & {
  padded?: boolean;
};

export const Frame = forwardRef<Animated.ScrollView, FrameProps>(
  ({ children, padded = true, ...props }, ref) => {
    const sheetContextValue = useSheetContext();

    return (
      <Floating.Portal>
        <sheetContext.Provider value={sheetContextValue}>
          <Floating.Overlay />
          <Floating.Content asChild>
            <ScrollView padded={padded} {...props}>
              {children}
            </ScrollView>
          </Floating.Content>
        </sheetContext.Provider>
      </Floating.Portal>
    );
  }
);
