/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';
import { Trash01 as Base } from './Trash01';

export const Trash01 = withDefaultProps(Base, {
  Svg: 'svg',
  Path: 'path',
});
