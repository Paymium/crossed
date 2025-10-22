/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { FocusScopeProps } from './FocusScopeProps';

export const FocusScope = (props: FocusScopeProps) => {
  return props.children as any;
};
FocusScope.displayName = 'FocusScope';
