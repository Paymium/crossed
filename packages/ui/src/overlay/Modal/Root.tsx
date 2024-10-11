/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { PropsWithChildren } from 'react';
import { Floating } from '../Floating';
import { localContext, VariantSize } from './context';
import { FloatingProps } from '../Floating/Root';

export type ModalProps = PropsWithChildren<VariantSize> & {
  floatingProps?: FloatingProps;
};
export const ModalRoot = ({
  size = 'md',
  children,
  floatingProps,
}: ModalProps) => {
  return (
    <Floating {...floatingProps}>
      <localContext.Provider value={{ size }}>{children}</localContext.Provider>
    </Floating>
  );
};
ModalRoot.displayName = 'Modal';
