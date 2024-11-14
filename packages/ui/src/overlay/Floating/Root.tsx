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
  useCallback,
  useImperativeHandle,
} from 'react';
import { FloatingProvider } from './context';
import { useUncontrolled, UseUncontrolledInput } from '@crossed/core';

export type FloatingProps = PropsWithChildren<
  {
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
  } & Omit<UseUncontrolledInput<boolean>, 'finalValue'>
>;
export type FloatingRef = {
  onClose: () => void;
  onOpen: () => void;
};
export const FloatingRoot = memo(
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
        <FloatingProvider
          open={open}
          onClose={onClose}
          onOpen={onOpen}
          visibilityHidden={visibilityHidden}
          closeOverlayPress={closeOverlayPress ?? true}
          wait={wait}
          removeScroll={removeScroll}
        >
          {children}
        </FloatingProvider>
      );
    }
  )
);
FloatingRoot.displayName = 'Floating';
