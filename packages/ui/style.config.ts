/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Registry } from '@crossed/styled';
import { themes } from '@crossed/theme';

type ThemesCustom = typeof themes;

declare module '@crossed/styled' {
  export interface Themes extends ThemesCustom {}
}
Registry.setThemes(themes).setThemeName('dark');
