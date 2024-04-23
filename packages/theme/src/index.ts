/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { darkTheme, lightTheme, paymiumTheme, paymiumThemeDark } from './theme';

export const themes = {
  dark: darkTheme,
  light: lightTheme,
  paymiumLight: paymiumTheme,
  paymiumDark: paymiumThemeDark,
} as const;
