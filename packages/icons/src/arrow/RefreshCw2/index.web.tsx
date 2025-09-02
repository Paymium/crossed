/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';
import { RefreshCw2 as Base } from './RefreshCw2';

export const RefreshCw2 = withDefaultProps(Base, {
  Svg: 'svg',
  Path: 'path',
});
