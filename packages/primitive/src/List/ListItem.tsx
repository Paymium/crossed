/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { InferRef } from '@crossed/core';
import { ComponentType, forwardRef } from 'react';

export const createListItem = <P,>(StyledItem: ComponentType<P>) =>
  forwardRef<InferRef<typeof StyledItem>, P>((props, ref) => (
    <StyledItem role="listitem" {...(props as any)} ref={ref} />
  ));
