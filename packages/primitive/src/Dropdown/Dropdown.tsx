/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { InferRef } from '@crossed/core';
import { forwardRef, type ComponentType } from 'react';

export const createDropdownMain = <P,>(StyledRoot: ComponentType<P>) =>
  forwardRef<InferRef<typeof StyledRoot>, P>((props, ref) => {
    return <StyledRoot {...(props as any)} ref={ref} />;
  });
