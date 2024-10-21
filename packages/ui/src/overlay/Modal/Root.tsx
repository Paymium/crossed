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
import { SheetProps } from '../Sheet/Root';
import { Sheet } from '../Sheet';
import { useMedia } from '../../useMedia';
import type { ScrollViewProps } from '../../other/ScrollView';

type ChildWithViariant = PropsWithChildren<VariantSize>;
export type ModalProps = ChildWithViariant &
  Pick<ScrollViewProps<any>, 'stickyHeader' | 'stickyFooter'> & {
    /**
     * Props send to Floating copmponent
     */
    floatingProps?: FloatingProps;
    /**
     * Adapt to sheet responsive
     */
    adapt?: boolean;
    /**
     * pass to sheet when adapt is true
     */
    sheetProps?: SheetProps;
  };
export const ModalRoot = ({
  size = 'md',
  children,
  floatingProps,
  adapt,
  sheetProps,
  stickyFooter,
  stickyHeader,
}: ModalProps) => {
  const { md } = useMedia();
  const showSheet = adapt && !md;
  return (
    <Sheet
      stickyFooter={stickyFooter}
      stickyHeader={stickyHeader}
      {...sheetProps}
    >
      <Floating {...floatingProps}>
        <localContext.Provider
          value={{ size, showSheet, stickyFooter, stickyHeader }}
        >
          {children}
        </localContext.Provider>
      </Floating>
    </Sheet>
  );
};
ModalRoot.displayName = 'Modal';
