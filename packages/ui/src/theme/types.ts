import type { UnistylesThemes } from '@crossed/styled';

export type Theme = {
  colors: {
    textColor: string;
    headingColor: string;
    background: string;
    backgroundStrong: string;
    backgroundPress: string;
    backgroundHover: string;
    borderColor: string;
    linkColor: string;

    neutral: string;
    error: string;
    success: string;
    warning: string;
    info: string;
  };
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
    select: (
      _p: { hover?: any; active?: any; focus?: any; base?: any },
      _state: { hover?: boolean; active?: boolean; focus?: boolean }
    ) => string;
  };
};
export type Themes = UnistylesThemes & {
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
