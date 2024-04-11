/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { darkTheme, lightTheme } from './theme/theme';

const themes = { dark: darkTheme, light: lightTheme };
type ThemesCustom = typeof themes;
declare module '@crossed/styled' {
  export interface Themes extends ThemesCustom {}
}
