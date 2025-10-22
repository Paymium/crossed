/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import darkTheme from './dark/theme';
import lightTheme from './light/theme';

const themes = {
  dark: darkTheme,
  light: lightTheme,
} as const;

export { themes };
export * from './types/color';
export * from './types/font';
export * from './types/space';
export * from './types/theme';
