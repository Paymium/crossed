/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Registry } from '@crossed/styled/registry';
import {
  BasePlugin,
  PseudoClassPlugin,
  VariantsPlugin,
  MediaQueriesPlugin,
  type CrossedBasePlugin,
  type CrossedVariantsPlugin,
  type CrossedMediaQueriesPlugin,
  type CrossedPseudoClassPlugin,
  type CrossedVariantsPluginProps,
} from '@crossed/styled/plugins';
import { darkTheme } from '@crossed/ui/theme';

const breakpoints = { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200 };

Registry.setTheme(darkTheme)
  .addPlugin(BasePlugin)
  .addPlugin(PseudoClassPlugin)
  .addPlugin(VariantsPlugin)
  .addPlugin(MediaQueriesPlugin(breakpoints));

type Theme = typeof darkTheme;

declare module '@crossed/styled' {
  // export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface CrossedstyleTheme extends Theme {}

  export interface StyleSheet
    extends CrossedBasePlugin,
      CrossedVariantsPlugin,
      CrossedMediaQueriesPlugin<keyof typeof breakpoints>,
      CrossedPseudoClassPlugin {}

  export interface CrossedPropsExtended<S extends StyleSheet>
    extends CrossedVariantsPluginProps<S['variants']> {}
}
