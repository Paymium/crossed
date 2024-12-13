/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { PropsWithChildren, useId } from 'react';
import { Floating } from '../Floating';
import { localContext, VariantSize } from './context';
import { FloatingProps } from '../Floating/Root';
import { useMedia } from '../../useMedia';
// import type { ScrollViewProps } from '../../other/ScrollView';

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
export const ModalRoot = ({
  size = 'md',
  children,
  floatingProps,
  adapt,
}: ModalProps) => {
  const { md } = useMedia();
  const showSheet = adapt && !md;
  const id = useId();
  return (
    <Floating visibilityHidden wait={300} {...floatingProps}>
      <localContext.Provider value={{ size, showSheet, idRef: id }}>
        {children}
      </localContext.Provider>
    </Floating>
  );
};
ModalRoot.displayName = 'Modal';
