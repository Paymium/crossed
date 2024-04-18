/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

export type ColorName = 'brand' | 'success' | 'info' | 'warning' | 'error';

export type Color = {
  hight: string;
  low: string;
  bright: string;
  muted: string;
  satured: string;
};

export type Colors = Record<ColorName, Color> & {
  neutral: Color & {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
};
