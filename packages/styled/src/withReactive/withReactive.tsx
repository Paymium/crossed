/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import { useTheme } from '../useTheme';

export const withReactive = <Ref, P = {}>(
  Comp: ForwardRefRenderFunction<Ref, P>
) =>
  forwardRef<Ref, P>((props, ref) => {
    useTheme();
    return <Comp {...props} ref={ref} />;
  });
