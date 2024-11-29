/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { forwardRef } from 'react';

import type { FocusScopeProps } from './FocusScopeProps';

export const FocusScope = forwardRef((props: FocusScopeProps, _ref) => {
  return props.children as any;
});
FocusScope.displayName = 'FocusScope';
