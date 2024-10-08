/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useUncontrolled } from '@crossed/core';
import {
  forwardRef,
  type PropsWithChildren,
  useCallback,
  useImperativeHandle,
} from 'react';
import { type SheetContext, sheetContext } from './context';
import { useSharedValue } from 'react-native-reanimated';

export type SheetProps = PropsWithChildren<{
  /**
   * Controlled state
   */
  open?: boolean;
  /**
   * default open
   */
  defaultValue?: boolean;
  /**
   * Fire changed open
   */
  onOpenChange?: (_value: boolean) => void;
  /**
   * Size keep with top of window
   */
  offset?: number;
}> &
  Pick<SheetContext, 'dismissOnOverlayPress' | 'hideHandle' | 'full'>;

export type RootRef = {
  close: () => void;
  open: () => void;
};

export const Root = forwardRef<RootRef, SheetProps>(
  (
    {
      open: openProps,
      defaultValue: defaultValueProps = false,
      onOpenChange,
      children,
      dismissOnOverlayPress = true,
      hideHandle,
      offset = 20,
      full,
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

    useImperativeHandle(
      ref,
      () => ({
        close: onClose,
        open: () => setOpen(true),
      }),
      [onClose, setOpen]
    );

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
          full,
        }}
      >
        {children}
      </sheetContext.Provider>
    );
  }
);
Root.displayName = 'Sheet';
