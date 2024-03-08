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
} from '@crossed/styled/plugins';
import type { darkTheme } from './theme/theme';
import type { breakpoints } from './theme/breakpoints';
import type { CrossedVariantsPluginProps } from '@crossed/styled/src/plugins/Variants';

type Theme = typeof darkTheme;
type Breakpoints = keyof typeof breakpoints;

declare module '@crossed/styled' {
  // export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface CrossedstyleTheme extends Theme {}
  export interface StyleSheet
    extends CrossedBasePlugin,
      CrossedVariantsPlugin,
      CrossedMediaQueriesPlugin<Breakpoints>,
      CrossedPseudoClassPlugin {}

  export interface CrossedPropsExtended<S extends StyleSheet>
    extends CrossedVariantsPluginProps<S['variants']> {}
}
