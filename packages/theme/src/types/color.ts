/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

type ColorPalette = {
  25: string;
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
};

type UtilityColorPalette = Omit<ColorPalette, 950 | 900 | 800 | 25>;

export type PrimaryColor = {
  base: { black: string; white: string; transparent: string };
  gray: ColorPalette;
  brand: ColorPalette;
  error: ColorPalette;
  warning: ColorPalette;
  success: ColorPalette;
};
export type SecondaryColor = {
  grayBlue: ColorPalette;
  grayCool: ColorPalette;
  grayModern: ColorPalette;
  grayNeutral: ColorPalette;
  grayIron: ColorPalette;
  grayTrue: ColorPalette;
  grayWarm: ColorPalette;
  moss: ColorPalette;
  greenLight: ColorPalette;
  green: ColorPalette;
  teal: ColorPalette;
  cyan: ColorPalette;
  blueLight: ColorPalette;
  blue: ColorPalette;
  blueDark: ColorPalette;
  indigo: ColorPalette;
  violet: ColorPalette;
  purple: ColorPalette;
  fuchsia: ColorPalette;
  pink: ColorPalette;
  rose: ColorPalette;
  orangeDark: ColorPalette;
  orange: ColorPalette;
  yellow: ColorPalette;
};

type ColorStructure = {
  default: string;
  hover?: string;
  alt?: string;
  brand?: string;
  subtle?: string;
  solid?: string;
};

export type Colors = {
  primary: PrimaryColor;
  secondary: SecondaryColor;
  gradient: {
    brand: {
      1: [string, string];
      2: [string, string];
      3: [string, string];
      4: [string, string];
      5: [string, string];
      6: [string, string];
    };
  };
  text: {
    primary: ColorStructure;
    secondary: ColorStructure;
    tertiary: ColorStructure;
    quaternary: ColorStructure;
    brand: {
      primary: ColorStructure;
      secondary: ColorStructure;
      tertiary: ColorStructure;
    };
    error: ColorStructure;
    warning: ColorStructure;
    success: ColorStructure;
    disabled: ColorStructure;
    placeholder: ColorStructure;
  };
  background: {
    primary: ColorStructure;
    secondary: ColorStructure;
    tertiary: ColorStructure;
    quaternary: ColorStructure;
    disabled: ColorStructure;
    overlay: ColorStructure;
    brand: {
      primary: ColorStructure;
      secondary: ColorStructure;
      quaternary: ColorStructure;
      active: ColorStructure;
      solid: ColorStructure;
      section: ColorStructure;
    };
    active: ColorStructure;
    error: {
      primary: ColorStructure;
      secondary: ColorStructure;
      solid: ColorStructure;
    };
    warning: {
      primary: ColorStructure;
      secondary: ColorStructure;
      solid: ColorStructure;
    };
    success: {
      primary: ColorStructure;
      secondary: ColorStructure;
      solid: ColorStructure;
    };
  };
  foreground: {
    primary: ColorStructure;
    secondary: ColorStructure;
    tertiary: ColorStructure;
    quaternary: ColorStructure;
    disabled: ColorStructure & { subtleBrand: string };
    brand: {
      primary: ColorStructure;
      secondary: ColorStructure;
      tertiary: ColorStructure;
      quaternary: ColorStructure;
    };
    error: {
      primary: ColorStructure;
      secondary: ColorStructure;
    };
    warning: {
      primary: ColorStructure;
      secondary: ColorStructure;
    };
    success: {
      primary: ColorStructure;
      secondary: ColorStructure;
    };
  };
  border: {
    primary: ColorStructure & { w: string };
    secondary: ColorStructure & { w: string };
    tertiary: ColorStructure & { w: string };
    brand: ColorStructure;
    error: ColorStructure;
    disabled: ColorStructure & { subtlew: string; w: string };
  };
  utility: {
    gray: Omit<ColorPalette, 950 | 25>;
    brand: Record<
      keyof Omit<ColorPalette, 950 | 25>,
      { default: string; alt: string }
    >;
    error: UtilityColorPalette;
    warning: UtilityColorPalette;
    success: UtilityColorPalette;
    grayBlue: UtilityColorPalette;
    blueLight: UtilityColorPalette;
    blue: UtilityColorPalette;
    blueDark: UtilityColorPalette;
    indigo: UtilityColorPalette;
    purple: UtilityColorPalette;
    fuchsia: UtilityColorPalette;
    pink: UtilityColorPalette;
    orangeDark: UtilityColorPalette;
    orange: UtilityColorPalette;
  };
};
