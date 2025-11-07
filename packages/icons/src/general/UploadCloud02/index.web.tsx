/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps } from '@crossed/core';
import { UploadCloud02 as Base } from './UploadCloud02';

export const UploadCloud02 = withDefaultProps(Base, {
  Svg: 'svg',
  Path: 'path',
});
