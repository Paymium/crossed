/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { CrossedstyleTheme } from '../types';

export type UseStyles = (
  _params: () => Record<string, Record<string, any>>
) => {
  styles: Record<
    string,
    {
      className: string;
      style: Record<string, any>;
    }
  >;
  theme: CrossedstyleTheme;
};
