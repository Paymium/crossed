/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';
import { ChevronSelectorHorizontal as Base } from './ChevronSelectorHorizontal';

export const ChevronSelectorHorizontal = withDefaultProps(Base, {
  Svg: 'svg',
  Path: 'path',
});
