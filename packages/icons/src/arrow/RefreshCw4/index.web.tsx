/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';
import { RefreshCw4 as Base } from './RefreshCw4';

export const RefreshCw4 = withDefaultProps(Base, {
  Svg: 'svg',
  Path: 'path',
});
