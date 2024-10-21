/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createContext } from 'react';

export type VariantSize = {
  /**
   * Size of modal
   */
  size: 'sm' | 'md' | 'lg';
};

export type LocalContext = VariantSize & {
  showSheet?: boolean;
  stickyHeader?: boolean;
  stickyFooter?: boolean;
};

export const localContext = createContext<LocalContext>({ size: 'md' });
