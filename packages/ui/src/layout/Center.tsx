/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withStyle } from '@crossed/styled';
import { YBox } from './YBox';

export const Center = withStyle(YBox, () => ({
  base: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
