/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';
import type { ComponentType } from 'react';

export const createListMain = <P extends Record<string, any>>(
  StyledRoot: ComponentType<P>
) => withDefaultProps(StyledRoot, { role: 'list' } as any);
