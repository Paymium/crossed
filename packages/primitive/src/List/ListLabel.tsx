/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { forwardRef, type ComponentType } from 'react';

export const createListLabel = <P,>(Styled: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => <Styled {...(props as any)} ref={ref} />);
