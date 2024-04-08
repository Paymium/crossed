/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type {
  CrossedBasePlugin,
  CrossedMediaQueriesPlugin,
  CrossedPseudoClassPlugin,
  CrossedVariantsPlugin,
  CrossedVariantsPluginProps,
  CrossedPseudoClassProps,
} from '@crossed/styled/plugins';
import { darkTheme, lightTheme } from './theme/theme';
import type { breakpoints } from './theme/breakpoints';

const themes = { dark: darkTheme, light: lightTheme };
type ThemesCustom = typeof themes;
type Breakpoints = keyof typeof breakpoints;

declare module '@crossed/styled' {
  export interface Themes extends ThemesCustom {}

  export interface StyleSheet
    extends CrossedBasePlugin,
      CrossedVariantsPlugin,
      CrossedMediaQueriesPlugin<Breakpoints>,
      CrossedPseudoClassPlugin {}

  export interface CrossedPropsExtended<S extends StyleSheet>
    extends CrossedPseudoClassProps,
      CrossedVariantsPluginProps<S['variants']> {}
}
