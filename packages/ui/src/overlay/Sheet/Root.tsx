/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { forwardRef, type PropsWithChildren } from 'react';
import { type SheetContext, sheetContext } from './context';
import { useSharedValue } from 'react-native-reanimated';
import { Floating } from '../Floating';
import { FloatingRef } from '../Floating/Root';

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
  /**
   * if true detach sheet from bottom
   */
  detach?: boolean;
}> &
  Pick<
    SheetContext,
    | 'dismissOnOverlayPress'
    | 'hideHandle'
    | 'full'
    | 'stickyFooter'
    | 'stickyHeader'
  >;

export const Root = forwardRef<FloatingRef, SheetProps>(
  (
    {
      open,
      defaultValue,
      onOpenChange,
      children,
      dismissOnOverlayPress = true,
      hideHandle,
      offset = 20,
      full,
      stickyFooter,
      stickyHeader,
      detach,
    },
    ref
  ) => {
    const snapInitialHeight = useSharedValue(0);

    return (
      <Floating
        ref={ref}
        value={open}
        defaultValue={defaultValue}
        onChange={onOpenChange}
      >
        <sheetContext.Provider
          value={{
            dismissOnOverlayPress,
            hideHandle,
            snapInitialHeight,
            offset: offset + 40,
            full,
            stickyFooter,
            stickyHeader,
            detach,
          }}
        >
          {children}
        </sheetContext.Provider>
      </Floating>
    );
  }
);
Root.displayName = 'Sheet';
