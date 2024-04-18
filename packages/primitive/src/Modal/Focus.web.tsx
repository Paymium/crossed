/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { ModalFocusComponent, UseEscape } from './types';
import ReactFocusLock from 'react-focus-lock';
import { VisibilityHidden } from '../VisibilityHidden';
import { useMemo } from 'react';

export const Focus: ModalFocusComponent = ({ children, open, ...props }) => {
  return (
    <ReactFocusLock
      as={VisibilityHidden}
      lockProps={{ ...props, 'hide': !open, 'aria-hidden': (!open).toString() }}
      disabled={!open}
    >
      {children}
    </ReactFocusLock>
  );
};

export const useEscape: UseEscape = (escape) => {
  return useMemo(() => {
    return {
      onKeyDown: (e) => {
        if (e.code === 'Escape') {
          escape();
        }
      },
    };
  }, []);
};
