/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import Registry from './Registry';
import type { CreateStyleParams } from './types';

export const createStyle = (data: CreateStyleParams) => {
  return () => (typeof data === 'function' ? data(Registry.getTheme()) : data);
};
