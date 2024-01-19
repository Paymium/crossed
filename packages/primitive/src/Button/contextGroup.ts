/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createScope } from '@crossed/core';
import type { Orientation } from '../utils/RovingFocus';

type ButtonGroupContext = {
  orientation: Orientation;
  grouped?: boolean;
};
export const [ProviderGroup, useContextGroup] = createScope<ButtonGroupContext>(
  { orientation: 'horizontal' } as ButtonGroupContext
);
