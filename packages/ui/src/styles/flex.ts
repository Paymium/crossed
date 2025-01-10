/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const shrinkStyles = createStyles(() => ({
  on: { base: { flexShrink: 1 } },
  off: { base: { flexShrink: 0 } },
}));

export const growStyles = createStyles(() => ({
  on: { base: { flexGrow: 1 } },
  off: { base: { flexGrow: 0 } },
}));
