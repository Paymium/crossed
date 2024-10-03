/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React, { ComponentType, forwardRef } from 'react';
import { useTheme } from '../useTheme';

export const withReactive = <P extends Record<string, any>>(
  Comp: ComponentType<P>
) =>
  forwardRef<P['ref'], P>((props, ref) => {
    useTheme();
    return <Comp ref={ref} {...(props as any)} />;
  });
