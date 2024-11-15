/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { forwardRef } from 'react';
import type { VisibilityHiddenComponent } from './types';
import { View } from 'react-native';
import { Slot } from '../../Slot';

export const VisibilityHidden: VisibilityHiddenComponent = forwardRef(
  ({ hide, ...props }, ref) => {
    return hide ? null : <Slot Comp={View} {...props} ref={ref} />;
  }
);

VisibilityHidden.displayName = 'VisibilityHidden';
