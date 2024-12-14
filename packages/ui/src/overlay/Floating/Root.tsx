/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  forwardRef,
  memo,
  PropsWithChildren,
  RefAttributes,
  useCallback,
  useImperativeHandle,
} from 'react';
import {
  FloatingConfig,
  FloatingConfigProvider,
  FloatingProvider,
} from './context';
import { useUncontrolled } from '@crossed/core';

export type FloatingProps = PropsWithChildren & {
  /**
   * if false, press on overlay not close the modal
   */
  closeOverlayPress?: boolean;

  /**
   * remove scroll behavior
   * @default true
   */
  removeScroll?: boolean;

  /**
   * wait in ms for hide content on exiting (use for animate)
   * @default true
   */
  wait?: number;

  /**
   * Initial value for uncontrolled state
   */
  defaultValue?: boolean;

  /**
   * Value for controlled state
   */
  value?: boolean;

  /**
   * Controlled state onChange handler
   */
  onChange?: (_p: boolean) => void;

  /**
   * If false, not render in portal
   */
  portal?: boolean;
} & Partial<Pick<FloatingConfig, 'triggerStrategy' | 'enabled'>>;
export type FloatingRef = {
  onClose: () => void;
  onOpen: () => void;
};
export const FloatingRoot = memo<FloatingProps & RefAttributes<FloatingRef>>(
  forwardRef<FloatingRef, FloatingProps>(
    (
      {
        children,
        defaultValue = false,
        onChange,
        value,
        closeOverlayPress,
        wait = 0,
        removeScroll = true,
        triggerStrategy = 'onPress',
        enabled = true,
        portal = true,
      }: FloatingProps,
      ref
    ) => {
      const [open, setOpen] = useUncontrolled({
        defaultValue,
        onChange,
        value,
      });
      const onClose = useCallback(() => {
        setOpen(false);
      }, [setOpen]);
      const onOpen = useCallback(() => {
        setOpen(true);
      }, [setOpen]);

      useImperativeHandle(ref, () => ({ onClose, onOpen }), [onClose, onOpen]);

      return (
        <FloatingConfigProvider
          triggerStrategy={triggerStrategy}
          enabled={enabled}
          portal={portal}
        >
          <FloatingProvider
            open={open}
            onClose={onClose}
            onOpen={onOpen}
            closeOverlayPress={closeOverlayPress ?? true}
            wait={wait}
            removeScroll={removeScroll}
          >
            {children}
          </FloatingProvider>
        </FloatingConfigProvider>
      );
    }
  )
);
FloatingRoot.displayName = 'Floating';
