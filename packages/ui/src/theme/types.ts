/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { CrossedstyleTheme } from '@crossed/styled';

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type Colors = {
  // brand colors
  primary: string;
  secondary: string;

  // common colors
  neutral: string;
  success: string;
  info: string;
  error: string;
  warning: string;
  link: string;
  white: string;
  black: string;
  default: string;

  // background colors
  background: string;
  backgroundStrong: string;
  backgroundSoft: string;
};

export type VariantColor = {
  [key in keyof Omit<
    Colors,
    'background' | 'backgroundStrong' | 'backgroundSoft'
  >]: { base: { color: Colors[key] } };
};

export type VariantBackgroundColor = {
  [key in keyof Omit<
    Colors,
    | 'background'
    | 'backgroundStrong'
    | 'backgroundSoft'
    | 'black'
    | 'default'
    | 'white'
  >]: { base: { backgroundColor: Colors[key] } };
};

export type Theme = {
  colors: Colors;
  fontFamily: string;
  space: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  size: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  fontSize: {
    'xxs': number;
    'xs': number;
    'sm': number;
    'default': number;
    'md': number;
    'lg': number;
    'xl': number;
    '2xl': number;
    '3xl': number;
    '4xl': number;
    '5xl': number;
  };
  utils: {
    shadeColor: (_col: string, _amt: number) => string;
    hexToRgbA: (_hex: string, _alpha: number) => string;
    rgbaToHex: (_rgba: string) => string;
    select: (
      _p: { hover?: any; active?: any; focus?: any; base?: any },
      _state: { hover?: boolean; active?: boolean; focus?: boolean }
    ) => string;
    createVariants: {
      (_type: 'color', _theme: Theme): VariantColor;
      (_type: 'backgroundColor', _theme: Theme): VariantBackgroundColor;
    };
  };
};
export type Themes = CrossedstyleTheme & {
  light: Theme;
  dark: Theme;
  [key: string]: Theme;
};
export type Extends = { themes: RecursivePartial<Themes> };

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object | undefined
    ? RecursivePartial<T[P]>
    : T[P];
};
