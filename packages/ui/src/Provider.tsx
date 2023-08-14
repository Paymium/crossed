import { PropsWithChildren, createContext, useContext } from 'react';
import { tw, useAppColorScheme, useDeviceContext } from '@crossed/core';
import { PortalProvider } from '@gorhom/portal';

type ThemeScheme = any;

type ThemeContext = {
  theme: ThemeScheme;
  setTheme: (colorScheme: any) => void;
};

const themeContext = createContext<ThemeContext>({} as ThemeContext);

export const useThemeContext = () => useContext(themeContext);

export const CrossedProvider = ({
  defaultTheme,
  children,
}: PropsWithChildren<{ defaultTheme: ThemeScheme }>) => {
  useDeviceContext(tw, { withDeviceColorScheme: true });
  const [theme, , setTheme] = useAppColorScheme(tw, defaultTheme);

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      <PortalProvider>{children}</PortalProvider>
    </themeContext.Provider>
  );
};
