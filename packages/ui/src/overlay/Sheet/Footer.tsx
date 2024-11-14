/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';

import { XBox } from '../../layout/XBox';

export const SheetFooter = withDefaultProps(XBox, {
  justifyContent: 'end',
  space: 'xs',
});
SheetFooter.displayName = 'Sheet.Footer';
