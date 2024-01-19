/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentType, forwardRef } from 'react';

export const createBadgeText = <T,>(StyledText: ComponentType<T>) =>
  forwardRef<any, T>((props, ref) => {
    return <StyledText {...props} ref={ref} />;
  });
