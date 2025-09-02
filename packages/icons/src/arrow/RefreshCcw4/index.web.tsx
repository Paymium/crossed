/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';
import { RefreshCcw4 as Base } from './RefreshCcw4';

export const RefreshCcw4 = withDefaultProps(Base, {
  Svg: 'svg',
  Path: 'path',
});
