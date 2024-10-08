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
import { useUncontrolled } from '@crossed/core';

export type FloatingProps = PropsWithChildren<{
  /**
   * if true, render but hide it in css
   */
  visibilityHidden?: boolean;
}>;
export type FloatingRef = {
  onClose: () => void;
  onOpen: () => void;
};
export const FloatingRoot = forwardRef<FloatingRef, FloatingProps>(
  ({ children, visibilityHidden }: FloatingProps, ref) => {
    const [open, setOpen] = useUncontrolled({ defaultValue: false });
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
      >
        {children}
      </FloatingProvider>
    );
  }
);
FloatingRoot.displayName = 'Floating';
