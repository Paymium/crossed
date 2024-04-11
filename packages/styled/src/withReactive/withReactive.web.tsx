/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { ComponentType } from 'react';

export const withReactive = <P extends Record<string, any>>(
  Comp: ComponentType<P>
) => Comp;
