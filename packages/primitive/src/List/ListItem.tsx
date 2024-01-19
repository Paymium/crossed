/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentType, forwardRef } from 'react';

export const createListItem = <P,>(StyledItem: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => (
    <StyledItem role="listitem" {...props} ref={ref} />
  ));
