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
};
export const ModalRoot = memo<ModalProps & RefAttributes<FloatingRef>>(
  forwardRef(({ size = 'md', children, floatingProps, adapt = true }, ref) => {
    const { md } = useMedia();
    const showSheet = adapt && !md;
    const id = useId();
    return (
      <Floating {...floatingProps} ref={ref}>
        <localContext.Provider value={{ size, showSheet, idRef: id }}>
          {children}
        </localContext.Provider>
      </Floating>
    );
  })
);
ModalRoot.displayName = 'Modal';
