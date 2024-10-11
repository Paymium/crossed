/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { forwardRef, type PropsWithChildren, useCallback, useRef } from 'react';
import { type SheetContext, sheetContext } from './context';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { Floating } from '../Floating';
import { FloatingProps, FloatingRef } from '../Floating/Root';

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
    },
    ref
  ) => {
    const isMove = useSharedValue(false);
    const height = useSharedValue(0);
    const snapInitialHeight = useSharedValue(0);
    const scrollRef = useRef<Animated.ScrollView>(null);

    const onChange: FloatingProps['onChange'] = useCallback(
      (e) => {
        onOpenChange?.(e);
        if (!e) {
          height.value = 0;
        }
      },
      [onOpenChange]
    );

    return (
      <Floating
        ref={ref}
        value={open}
        defaultValue={defaultValue}
        onChange={onChange}
      >
        <sheetContext.Provider
          value={{
            dismissOnOverlayPress,
            hideHandle,
            isMove,
            height,
            snapInitialHeight,
            offset: offset + 40,
            full,
            scrollRef,
          }}
        >
          {children}
        </sheetContext.Provider>
      </Floating>
    );
  }
);
Root.displayName = 'Sheet';
