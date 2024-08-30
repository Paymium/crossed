/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const textAlignStyles = createStyles(() => ({
  auto: { base: { textAlign: 'auto' } },
  justify: { base: { textAlign: 'justify' } },
  default: { base: { textAlign: 'left' } },
  center: { base: { textAlign: 'center' } },
  left: { base: { textAlign: 'left' } },
  right: { base: { textAlign: 'right' } },
}));
