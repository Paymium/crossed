/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { View } from 'react-native';
import { SlotProps } from '../../Slot';
import { BoxProps } from '../../layout/Box';

export type VisibilityHiddenProps = { hide?: boolean } & Omit<
  SlotProps<BoxProps>,
  'Comp'
>;
export type VisibilityHiddenComponent = ForwardRefExoticComponent<
  VisibilityHiddenProps & RefAttributes<View>
>;
