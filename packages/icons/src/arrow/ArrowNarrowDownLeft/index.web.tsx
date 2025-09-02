/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';
import { ArrowNarrowDownLeft as Base } from './ArrowNarrowDownLeft';

export const ArrowNarrowDownLeft = withDefaultProps(Base, {
  Svg: 'svg',
  Path: 'path',
});
