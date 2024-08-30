/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

export type Color = {
  hight: string;
  low: string;
  bright: string;
  muted: string;
  satured: string;
};

export type Colors = {
  white: string;
  black: string;
  text: {
    primary: string;
    secondary: string;
    brand: string;
    invert: string;
  };
  background: {
    primary: string;
    secondary: string;
    brand: string;
    hover: string;
    active: string;
  };
  border: {
    primary: string;
    secondary: string;
    tertiary: string;
    brand: string;
  };
  primary: {
    100: string;
    90: string;
    80: string;
    70: string;
    60: string;
    50: string;
    primary: string;
    40: string;
    30: string;
    20: string;
    10: string;
    1: string;
    0: string;
  };
  neutral: {
    100: string;
    90: string;
    80: string;
    70: string;
  };
  success: {
    primary: string;
    dark: string;
    light: string;
  };
  warning: {
    primary: string;
    dark: string;
    light: string;
  };
  info: {
    primary: string;
    dark: string;
    light: string;
  };
  error: {
    primary: string;
    satured: string;
    low: string;
    hight: string;
    muted: string;
  };
};
