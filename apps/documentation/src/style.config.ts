/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Registry } from '@crossed/styled';
import { themes as defaultThemes } from '@crossed/theme';
import { themes as primsThemes } from 'prism-react-renderer';

const themes = {
  dark: {
    ...defaultThemes.dark,
    draculaTheme: primsThemes.dracula,
  },
  light: {
    ...defaultThemes.light,
    draculaTheme: primsThemes.dracula,
  },
};

type ThemesCustom = typeof themes;

declare module '@crossed/styled' {
  export interface Themes extends ThemesCustom {}
}

Registry.setThemes(themes).setThemeName('light');
