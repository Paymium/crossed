/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';
import { RefreshCw1 as Base } from './RefreshCw1';

export const RefreshCw1 = withDefaultProps(Base, {
  Svg: 'svg',
  Path: 'path',
});
