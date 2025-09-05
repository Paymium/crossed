/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';
import { Gift2 as Base } from './Gift2';

export const Gift2 = withDefaultProps(Base, {
  Svg: 'svg',
  Path: 'path',
});
