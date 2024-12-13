/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  autoUpdate,
  offset,
  useFloating as useDefault,
} from '@floating-ui/react';
import { shift } from '@floating-ui/dom';
import type { UseFloating } from './types';

export const useFloating: UseFloating = () => {
  return useDefault({
    middleware: [shift({ crossAxis: true }), offset(8)],
    whileElementsMounted: autoUpdate,
  });
};
