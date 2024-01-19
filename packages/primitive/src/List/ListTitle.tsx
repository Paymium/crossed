/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentType, forwardRef } from 'react';

export const createListTitle = <P,>(StyledTitle: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => <StyledTitle {...props} ref={ref} />);
