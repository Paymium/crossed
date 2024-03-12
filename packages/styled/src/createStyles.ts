/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Registry } from './Registry';
import type { CreateStylesParams } from './types';

export const createStyles = <C extends string>(data: CreateStylesParams<C>) => {
  return () => {
    const result =
      typeof data === 'function' ? data({ theme: Registry.getTheme() }) : data;
    return result;
  };
};
