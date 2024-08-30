/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { MenuList } from '../../display/MenuList';
import { useSelectProvider } from './context';
import type { ContentProps } from './types';
import BottomSheet from '@devvie/bottom-sheet';
import { useCallback } from 'react';

export const ContentNative = ({ sheetProps, ...props }: ContentProps) => {
  const all = useSelectProvider();
  const { sheet, setOpen } = all;
  const onClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  return (
    <BottomSheet ref={sheet} {...sheetProps} onClose={onClose}>
      <MenuList {...props} />
    </BottomSheet>
  );
};

ContentNative.id = 'Select.Content';
ContentNative.displayName = 'Select.Content';
