/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';
import { Expand3 as Base } from './Expand3';

export const Expand3 = withDefaultProps(Base, {
  Svg: 'svg',
  Path: 'path',
});
