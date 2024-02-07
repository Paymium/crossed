/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import Registry from '@crossed/styled/registry';
import { darkTheme } from /*lightTheme*/ './theme';
// import { breakpoints } from './breakpoints';
// import deepmerge from 'deepmerge';
import type { Extends, Themes } from './types';

// type AppBreakpoints = typeof breakpoints;

type AppThemes = typeof darkTheme;

// type AppThemes = {
//   light: typeof lightTheme;
//   dark: typeof darkTheme;
// };

declare module '@crossed/styled' {
  // export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface CrossedstyleTheme extends AppThemes {}
}

export const setup = ({
  themes: _themes,
  extends: _extendsProps,
}: { themes?: Themes; extends?: Extends } = {}) => {
  Registry.setTheme(darkTheme);
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
