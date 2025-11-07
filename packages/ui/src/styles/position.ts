/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const positionStyles = createStyles(() => ({
  absoluteFill: {
    base: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
      top: 0,
      zIndex: 1,
    },
  },
  absolute: { base: { position: 'absolute' } },
  relative: { base: { position: 'relative' } },
}));
