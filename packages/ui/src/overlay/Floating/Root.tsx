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
   * if true, render but hide it in css
   */
  visibilityHidden?: boolean;

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
} & Partial<Pick<FloatingConfig, 'triggerStrategy'>>;
export type FloatingRef = {
  onClose: () => void;
  onOpen: () => void;
};
export const FloatingRoot = memo<FloatingProps & RefAttributes<FloatingRef>>(
  forwardRef<FloatingRef, FloatingProps>(
    (
      {
        children,
        visibilityHidden,
        defaultValue = false,
        onChange,
        value,
        closeOverlayPress,
        wait = 0,
        removeScroll = true,
        portal = true,
        triggerStrategy = 'onPress',
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
        <FloatingConfigProvider triggerStrategy={triggerStrategy}>
          <FloatingProvider
            open={open}
            onClose={onClose}
            onOpen={onOpen}
            visibilityHidden={visibilityHidden}
            closeOverlayPress={closeOverlayPress ?? true}
            wait={wait}
            removeScroll={removeScroll}
            portal={portal}
          >
            {children}
          </FloatingProvider>
        </FloatingConfigProvider>
      );
    }
  )
);
FloatingRoot.displayName = 'Floating';
