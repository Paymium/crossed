/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { UnistylesRegistry } from '@crossed/styled/src/unistyles';
import { darkTheme, lightTheme } from './theme';
import { breakpoints } from './breakpoints';
import deepmerge from 'deepmerge';
import type { Extends, Themes } from './types';
// import type { CrossedBasePlugin } from '@crossed/styled/src/plugins/Base';
// import type {
//   CrossedVariantsPlugin,
//   CrossedVariantsPluginProps,
// } from '@crossed/styled/src/plugins/Variants';
// import type { CrossedMediaQueriesPlugin } from '@crossed/styled/src/plugins/MediaQueries';
// import type { CrossedPseudoClassPlugin } from '@crossed/styled/src/plugins/PseudoClass';

// type AppBreakpoints = typeof breakpoints;

// type AppThemes = typeof darkTheme;

// type AppThemes = {
//   light: typeof lightTheme;
//   dark: typeof darkTheme;
// };

export const setup = ({
  themes: _themes,
  extends: _extendsProps,
}: { themes?: Themes; extends?: Extends } = {}) => {
  // Registry.setTheme(darkTheme);
  // Registry.addBreakpoints(breakpoints)
  //   .addThemes(
  //     themes ??
  //       deepmerge((extendsProps?.themes as any) || {}, {
  //         light: lightTheme,
  //         dark: darkTheme,
  //       })
  //   )
  //   .addConfig({
  //     initialTheme: 'dark',
  //     // experimentalCSSMediaQueries: true
  //   });
};
