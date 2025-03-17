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
  useId,
} from 'react';
import { useMedia } from '../../useMedia';
import { Floating, FloatingProps, FloatingRef } from '../Floating';
import { localContext, VariantSize } from './context';

type ChildWithViariant = PropsWithChildren<Partial<VariantSize>>;
export type ModalProps = ChildWithViariant & {
  /**
   * Props send to Floating copmponent
   */
  floatingProps?: FloatingProps;
  /**
   * Adapt to sheet responsive
   */
  adapt?: boolean;
  /**
   * Closable as boolean is a general props preventing the modal from closing when pressing on overlay
   * and preventing sheet from closing when touching outside sheet or when swiping bottom
   * as an object it provides greater granularity and allow different behavior on web or mobile
   */
  closable?:
    | boolean
    | { closeOverlayPress?: boolean; closeOnTouchBackdrop?: boolean };
};
export const ModalRoot = memo<ModalProps & RefAttributes<FloatingRef>>(
  forwardRef(
    (
      { size = 'md', children, floatingProps, adapt = true, closable = true },
      ref
    ) => {
      const { md } = useMedia();
      const showSheet = adapt && !md;
      const id = useId();
      const closeOverlayProps =
        typeof closable === 'boolean' ? closable : closable.closeOverlayPress;
      return (
        <Floating
          closeOverlayPress={closeOverlayProps}
          {...floatingProps}
          ref={ref}
        >
          <localContext.Provider
            value={{ size, showSheet, idRef: id, closable }}
          >
            {children}
          </localContext.Provider>
        </Floating>
      );
    }
  )
);
ModalRoot.displayName = 'Modal';
