/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { forwardRef, memo, type PropsWithChildren } from 'react';
import { type SheetContext, sheetContext } from './context';
import { useSharedValue } from 'react-native-reanimated';
import { Floating } from '../Floating';
import { FloatingRef } from '../Floating/Root';

export type SheetProps = PropsWithChildren<{
  /**
   * Place content in portal
   * @default true
   */
  portal?: boolean;
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

export const Root = memo(
  forwardRef<FloatingRef, SheetProps>(
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
        portal = true,
      },
      ref
    ) => {
      const snapInitialHeight = useSharedValue(0);
      const translateY = useSharedValue<number | null>(null);

      return (
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
            portal,
            translateY,
          }}
        >
          <Floating
            ref={ref}
            value={open}
            defaultValue={defaultValue}
            onChange={onOpenChange}
            visibilityHidden
            wait={300}
          >
            {children}
          </Floating>
        </sheetContext.Provider>
      );
    }
  )
);
Root.displayName = 'Sheet';
