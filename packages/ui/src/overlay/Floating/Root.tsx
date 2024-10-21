/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  forwardRef,
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
    wait?: number;
  } & Omit<UseUncontrolledInput<boolean>, 'finalValue'>
>;
export type FloatingRef = {
  onClose: () => void;
  onOpen: () => void;
};
export const FloatingRoot = forwardRef<FloatingRef, FloatingProps>(
  (
    {
      children,
      visibilityHidden,
      defaultValue = false,
      onChange,
      value,
      closeOverlayPress,
      wait = 300
    }: FloatingProps,
    ref
  ) => {
    const [open, setOpen] = useUncontrolled({ defaultValue, onChange, value });
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
      >
        {children}
      </FloatingProvider>
    );
  }
);
FloatingRoot.displayName = 'Floating';
