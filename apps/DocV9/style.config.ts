/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Registry } from '@crossed/styled';
/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { themes } from '@crossed/theme';

type CustomThemes = typeof themes;

declare module '@crossed/styled' {
  export interface Themes extends CustomThemes {}
}
Registry.setThemes(themes).setThemeName('light');
