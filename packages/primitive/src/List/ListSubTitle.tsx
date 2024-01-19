/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { forwardRef, type ComponentType } from 'react';

export const createListSubTitle = <P,>(StyledSubTitle: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => <StyledSubTitle {...props} ref={ref} />);
