/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';
import { RefreshCcw1 as Base } from './RefreshCcw1';

export const RefreshCcw1 = withDefaultProps(Base, {
  Svg: 'svg',
  Path: 'path',
});
