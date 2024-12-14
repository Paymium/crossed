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
  size,
  shift,
} from '@floating-ui/react';
import type { UseFloating } from './types';

export const useFloating: UseFloating = () => {
  return useDefault({
    placement: 'bottom-start',
    middleware: [
      shift({ crossAxis: true }),
      offset(8),
      size({
        apply({ rects: { reference }, elements: { floating } }) {
          floating.style.minWidth = `${reference.width}px`;
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });
};
