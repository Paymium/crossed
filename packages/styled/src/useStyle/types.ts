/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { CrossedstyleTheme } from '../types';

export type UseStyle = (
  _params?: () => Record<string, any>,
  _props?: Record<string, any> & { className?: string; style?: any },
  _options?: { native?: boolean; debug?: boolean }
) => {
  className: string;
  style: Record<string, any>;
  theme: CrossedstyleTheme;
};
