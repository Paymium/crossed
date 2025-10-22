/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';
import { Zap as Base } from './Zap';

export const Zap = withDefaultProps(Base, {
  Svg: 'svg',
  Path: 'path',
});
