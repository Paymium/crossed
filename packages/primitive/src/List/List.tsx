/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentType, forwardRef } from 'react';

export const createListMain = <P,>(StyledRoot: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => (
    <StyledRoot role="list" {...(props as any)} ref={ref} />
  ));
