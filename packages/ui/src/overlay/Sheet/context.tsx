/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createContext, useContext } from 'react';
import type { SharedValue } from 'react-native-reanimated';

export type SheetContext = {
  dismissOnOverlayPress?: boolean;
  hideHandle?: boolean;
  snapInitialHeight: SharedValue<number>;
  offset: number;
  /**
   * Full height
   */
  full?: boolean;
  /**
   * enable Sticky header
   */
  stickyHeader?: boolean;
  /**
   * enable sticky footer
   */
  stickyFooter?: boolean;
  detach?: boolean;
  portal?: boolean;
};

export const sheetContext = createContext<SheetContext>({} as SheetContext);

export const useSheetContext = () => useContext(sheetContext);
