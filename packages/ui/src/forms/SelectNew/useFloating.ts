/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { UseFloating } from './types';

export const useFloating: UseFloating = () => {
  return {
    refs: {},
    floatingStyles: {},
  } as any;
};
