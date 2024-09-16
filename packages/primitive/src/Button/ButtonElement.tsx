/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { InferRef } from '@crossed/core';
import { type ComponentType, forwardRef } from 'react';

export const createButtonElement = <T,>(StyledElement: ComponentType<T>) =>
  forwardRef<InferRef<typeof StyledElement>, T>((props, ref) => {
    return <StyledElement {...(props as any)} ref={ref} />;
  });
