/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import darkTheme from './dark/theme';
import lightTheme from './light/theme';

export const themes = {
  dark: darkTheme,
  light: lightTheme,
} as const;
