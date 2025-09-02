/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';
import { RefreshCcw3 as Base } from './RefreshCcw3';

export const RefreshCcw3 = withDefaultProps(Base, {
  Svg: 'svg',
  Path: 'path',
});
