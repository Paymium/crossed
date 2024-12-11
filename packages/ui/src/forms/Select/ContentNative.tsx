/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { MenuList } from '../../display/MenuList';
import { Sheet } from '../../overlay/Sheet';
import { useSelectProvider } from './context';
import type { ContentProps } from './types';
import { useEffect, useRef } from 'react';
import { composeStyles, inlineStyle } from '@crossed/styled';

export const ContentNative = ({ sheetProps, ...props }: ContentProps) => {
  const all = useSelectProvider();
  const { open } = all;
  const refSheet = useRef(null);
  useEffect(() => {
    if (open) refSheet.current.show();
    else refSheet.current.hide();
  }, [open]);
  return (
    <Sheet ref={refSheet}>
      <Sheet.ScrollView contentProps={{ isModal: false }} padded={false}>
        <MenuList
          {...(props as any)}
          style={composeStyles(
            inlineStyle(({ space }) => ({
              base: { borderWidth: 0, marginBottom: space.md },
            })),
            props.style
          )}
        />
      </Sheet.ScrollView>
    </Sheet>
  );
};

ContentNative.id = 'Select.Content';
ContentNative.displayName = 'Select.Content';
