/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useMemo } from 'react';
import { VisibilityHidden } from '../VisibilityHidden';
import type { ModalFocusComponent, UseEscape } from './types';

export const Focus: ModalFocusComponent = ({ children, open, ...props }) => (
  <VisibilityHidden hide={!open} {...props}>
    {children}
  </VisibilityHidden>
);

export const useEscape: UseEscape = () => {
  return useMemo(() => {
    return {
      onKeyDown: () => {},
    };
  }, []);
};
