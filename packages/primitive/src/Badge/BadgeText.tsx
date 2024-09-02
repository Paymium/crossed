/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { InferRef } from '@crossed/core';
import { ComponentType, forwardRef } from 'react';

export const createBadgeText = <T,>(StyledText: ComponentType<T>) =>
  forwardRef<InferRef<typeof StyledText>, T>((props, ref) => {
    return <StyledText {...(props as any)} ref={ref} />;
  });
