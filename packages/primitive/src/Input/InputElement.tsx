/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { type ComponentType, forwardRef } from 'react';

export const createInputElement = <P,>(Styled: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => {
    return <Styled {...(props as any)} ref={ref} />;
  });
