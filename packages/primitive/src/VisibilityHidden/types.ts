/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { View, ViewProps } from 'react-native';

export type VisibilityHiddenProps = { hide?: boolean } & ViewProps;
export type VisibilityHiddenComponent = ForwardRefExoticComponent<
  VisibilityHiddenProps & RefAttributes<View>
>;
