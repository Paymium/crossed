/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useFocusScope as useOriginal } from 'react-focus-lock';
import { useSelectProvider } from './context';
import { useMemo } from 'react';

export const useFocusScope = () => {
  const { focusNext, focusPrev } = useOriginal();
  const { setOpen } = useSelectProvider();
  return useMemo(
    () => ({
      onKeyDown: (e) => {
        if (e.code === 'ArrowDown') {
          focusNext();
        } else if (e.code === 'ArrowUp') {
          focusPrev();
        } else if (e.code === 'Tab') {
          setOpen(false);
        }
      },
    }),
    [focusNext, focusPrev, setOpen]
  );
};
