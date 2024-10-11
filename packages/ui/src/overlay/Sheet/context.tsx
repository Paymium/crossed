/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createContext, MutableRefObject, useContext } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

export type SheetContext = {
  dismissOnOverlayPress?: boolean;
  hideHandle?: boolean;
  isMove: SharedValue<boolean>;
  height: SharedValue<number>;
  snapInitialHeight: SharedValue<number>;
  offset: number;
  /**
   * Full height
   */
  full?: boolean;
  scrollRef?: MutableRefObject<Animated.ScrollView>;
};

export const sheetContext = createContext<SheetContext>({} as SheetContext);

export const useSheetContext = () => useContext(sheetContext);
