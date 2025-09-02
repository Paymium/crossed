/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';
import { ChevronUpDouble as Base } from './ChevronUpDouble';

export const ChevronUpDouble = withDefaultProps(Base, {
  Svg: 'svg',
  Path: 'path',
});
