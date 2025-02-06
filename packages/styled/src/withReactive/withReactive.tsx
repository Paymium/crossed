/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React, { forwardRef } from 'react';
import { useTheme } from '../useTheme';

export const withReactive = <P extends object, R>(
  Comp: React.ComponentType<P>
) =>
  forwardRef<R, P>((props, ref) => {
    useTheme();
    return <Comp {...(props as P)} ref={ref as React.Ref<R>} />;
  });
