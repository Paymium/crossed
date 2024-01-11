import { UnistylesRegistry } from '@crossed/styled';
import { darkTheme, lightTheme } from './theme';
import { breakpoints } from './breakpoints';
import deepmerge from 'deepmerge';
import type { Extends, Themes } from './types';

type AppBreakpoints = typeof breakpoints;

type AppThemes = {
  light: typeof lightTheme;
  dark: typeof darkTheme;
};

declare module '@crossed/styled' {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

export const setup = ({
  themes,
  extends: extendsProps,
}: { themes?: Themes; extends?: Extends } = {}) => {
  UnistylesRegistry.addBreakpoints(breakpoints)
    .addThemes(
      themes ??
        deepmerge((extendsProps?.themes as any) || {}, {
          light: lightTheme,
          dark: darkTheme,
        })
    )
    .addConfig({
      initialTheme: 'dark',
      // experimentalCSSMediaQueries: true
    });
};
