/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Registry } from '@crossed/styled';
import {
  BasePlugin,
  PseudoClassPlugin,
  VariantsPlugin,
  MediaQueriesPlugin,
  CrossedWebPlugin,
  WebPlugin,
  type CrossedBasePlugin,
  type CrossedVariantsPlugin,
  type CrossedMediaQueriesPlugin,
  type CrossedPseudoClassPlugin,
  type CrossedVariantsPluginProps,
  type CrossedPseudoClassProps,
} from '@crossed/styled/plugins';
import { darkTheme, lightTheme } from '@crossed/ui/theme';

const breakpoints = { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200 };
const themes = {
  dark: darkTheme,
  light: lightTheme,
};

type ThemesCustom = typeof themes;

declare module '@crossed/styled' {
  export interface Themes extends ThemesCustom {}

  export interface StyleSheet
    extends CrossedBasePlugin,
      CrossedVariantsPlugin,
      CrossedWebPlugin,
      CrossedMediaQueriesPlugin<keyof typeof breakpoints>,
      CrossedPseudoClassPlugin {}

  export interface CrossedPropsExtended<S extends StyleSheet>
    extends CrossedPseudoClassProps,
      CrossedVariantsPluginProps<S['variants']> {}
}
Registry.setThemes(themes)
  .setThemeName('dark')
  .addPlugin(BasePlugin)
  .addPlugin(PseudoClassPlugin)
  .addPlugin(VariantsPlugin)
  .addPlugin(WebPlugin)
  .addPlugin(MediaQueriesPlugin(breakpoints));
