/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { InferRef } from '@crossed/core';
import { forwardRef, type ComponentType } from 'react';

export const createListLabel = <P,>(Styled: ComponentType<P>) =>
  forwardRef<InferRef<typeof Styled>, P>((props, ref) => (
    <Styled {...(props as any)} ref={ref} />
  ));
