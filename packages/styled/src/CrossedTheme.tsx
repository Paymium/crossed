import { createScope } from '@crossed/core';
import type { PropsWithChildren } from 'react';
import {
  RnColorScheme,
  default as tw,
  useAppColorScheme,
  useDeviceContext,
} from 'twrnc';

type CrossedThemeProvider = {
  theme: 'light' | 'dark';
  setTheme: (colorScheme: RnColorScheme) => void;
};

type CrossedThemeProps = {
  defaultTheme?: RnColorScheme;
};

const [Provider, useCrossedTheme] = createScope<CrossedThemeProvider>(
  {} as CrossedThemeProvider
);

const CrossedTheme = ({
  defaultTheme = 'dark',
  children,
}: PropsWithChildren<CrossedThemeProps>) => {
  useDeviceContext(tw, { withDeviceColorScheme: false });
  const [theme, , setTheme] = useAppColorScheme(tw, defaultTheme);
  const handleChangeTheme = (theme: RnColorScheme) => {
    setTheme(theme);
  };
  return (
    <Provider theme={theme as any} setTheme={handleChangeTheme}>
      {children}
    </Provider>
  );
};

export { useCrossedTheme, CrossedTheme };
