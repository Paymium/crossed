/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';
import { ChevronRight as Base } from './ChevronRight';

export const ChevronRight = withDefaultProps(Base, {
  Svg: 'svg',
  Path: 'path',
});
