/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useUncontrolled } from '@crossed/core';
import { forwardRef, type PropsWithChildren, useCallback, useRef } from 'react';
import { type SheetContext, sheetContext } from './context';
import { useSharedValue } from 'react-native-reanimated';
import { ActionSheetRef } from 'react-native-actions-sheet';

export type SheetProps = PropsWithChildren<{
  open?: boolean;
  defaultValue?: boolean;
  onOpenChange?: (_value: boolean) => void;
  offset?: number;
}> &
  Pick<SheetContext, 'dismissOnOverlayPress' | 'hideHandle'>;

export const Root = forwardRef<ActionSheetRef, SheetProps>(
  (
    {
      open: openProps,
      defaultValue: defaultValueProps = false,
      onOpenChange,
      children,
      dismissOnOverlayPress = true,
      hideHandle,
      offset = 20,
    },
    ref
  ) => {
    const [open, setOpen] = useUncontrolled({
      value: openProps,
      defaultValue: defaultValueProps,
      onChange: onOpenChange,
    });
    const isMove = useSharedValue(false);
    const height = useSharedValue(0);
    const snapInitialHeight = useSharedValue(0);
    const onClose = useCallback(() => {
      setOpen(false);
      height.value = 0;
    }, [setOpen, height]);

    const actionSheetRef = useRef<ActionSheetRef>(null);

    return (
      <sheetContext.Provider
        value={{
          open,
          setOpen,
          dismissOnOverlayPress,
          hideHandle,
          isMove,
          height,
          onClose,
          snapInitialHeight,
          offset: offset + 40,
          ref,
          actionSheetRef,
        }}
      >
        {children}
      </sheetContext.Provider>
    );
  }
);
