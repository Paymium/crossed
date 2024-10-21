/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useSheetContext } from './context';
import { sheetContext } from './context';
import { ScrollView, type SheetScrollViewProps } from './ScrollView';
import { Floating } from '../Floating';
import { Fragment, ReactNode } from 'react';

export type FrameProps = Omit<SheetScrollViewProps, 'children'> & {
  padded?: boolean;
  portal?: boolean;
  children?: ReactNode;
};

export const Frame = ({
  children,
  portal = true,
  padded = true,
  ...props
}: FrameProps) => {
  const sheetContextValue = useSheetContext();
  const P = portal ? Floating.Portal : Fragment;
  return (
    <P>
      <sheetContext.Provider value={sheetContextValue}>
        <Floating.Overlay />
        <Floating.Content style={{ zIndex: 1 }}>
          <ScrollView padded={padded} {...props}>
            {children}
          </ScrollView>
        </Floating.Content>
      </sheetContext.Provider>
    </P>
  );
};
