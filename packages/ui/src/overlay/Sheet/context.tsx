/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createContext, useContext } from 'react';
import type { SharedValue } from 'react-native-reanimated';

export type SheetContext = {
  open: boolean;
  setOpen: (_value: boolean) => void;
  dismissOnOverlayPress?: boolean;
  hideHandle?: boolean;
  isMove: SharedValue<boolean>;
  height: SharedValue<number>;
  onClose: () => void;
  snapInitialHeight: SharedValue<number>;
  offset: number;
};

export const sheetContext = createContext<SheetContext>({} as SheetContext);

export const useSheetContext = () => useContext(sheetContext);