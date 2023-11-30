import { createScope } from '@crossed/core';
import type { PropsWithChildren } from 'react';
import { RnColorScheme, useAppColorScheme, useDeviceContext } from './twrnc';
import tw from 'twrnc';

type CrossedThemeProvider = {
  theme: 'light' | 'dark';
  setTheme: (colorScheme: RnColorScheme) => void;
};

export type CrossedThemeProps = {
  defaultTheme?: RnColorScheme;
  theme?: CrossedThemeProvider['theme'];
};

const [Provider, useCrossedTheme] = createScope<CrossedThemeProvider>(
  {} as CrossedThemeProvider
);

const CrossedTheme = ({
  defaultTheme = 'dark',
  theme: themeProps,
  children,
}: PropsWithChildren<CrossedThemeProps>) => {
  useDeviceContext(tw, { withDeviceColorScheme: false });
  const [theme, , setTheme] = useAppColorScheme(tw, defaultTheme);
  const handleChangeTheme = (theme: RnColorScheme) => {
    setTheme(theme);
  };
  return (
    <Provider theme={themeProps ?? (theme as any)} setTheme={handleChangeTheme}>
      {children}
    </Provider>
  );
};

export { useCrossedTheme, CrossedTheme };
