/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Appearance, ColorSchemeName } from 'react-native';
import type { SetTheme } from './types';

export const setTheme: SetTheme = (old, theme: ColorSchemeName) => {
  Appearance.setColorScheme(theme);
};
