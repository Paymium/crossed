/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { colorsDark, colorsLight, paymiumLight } from './colors';
import { font } from './font';
import { space } from './space';
import type { Theme } from './types/theme';

export const lightTheme: Theme = {
  colors: colorsLight,
  space,
  font,
};

export const darkTheme: Theme = {
  colors: colorsDark,
  space,
  font,
};

export const paymiumTheme: Theme = {
  colors: paymiumLight,
  space,
  font: {
    ...font,
    family: 'Overpass',
  },
};
