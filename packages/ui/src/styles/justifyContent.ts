/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const justifyContentStyle = createStyles(() => ({
  start: { base: { justifyContent: 'flex-start' } },
  end: { base: { justifyContent: 'flex-end' } },
  between: { base: { justifyContent: 'space-between' } },
  around: { base: { justifyContent: 'space-around' } },
  evenly: { base: { justifyContent: 'space-evenly' } },
}));
