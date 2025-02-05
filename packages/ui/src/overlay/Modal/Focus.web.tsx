/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { FocusOn } from 'react-focus-on';
import { FocusProps } from './types';
import { useFocusScope as useOriginal } from 'react-focus-lock';
import { useMemo } from 'react';
import { useFloatingContext } from '../../overlay/Floating';

export const Focus = ({ style, ...props }: FocusProps) => {
  return <FocusOn {...style.className()} {...props} />;
};

export const useFocusScope = () => {
  const { focusNext, focusPrev } = useOriginal();
  const { onClose } = useFloatingContext();
  return useMemo(
    () => ({
      onKeyDown: (e: any) => {
        if (e.code === 'ArrowDown') {
          focusNext();
        } else if (e.code === 'ArrowUp') {
          focusPrev();
        } else if (e.code === 'Tab') {
          onClose();
        }
      },
    }),
    [focusNext, focusPrev, onClose]
  );
};
