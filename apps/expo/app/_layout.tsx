/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

// import { CrossedTheme, useCrossedTheme } from '@crossed/styled';
import { CrossedUIProvider } from '@crossed/ui';
import { Slot, SplashScreen } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';

export { ErrorBoundary } from 'expo-router';

import { Registry } from '@crossed/styled';
import {
  BasePlugin,
  PseudoClassPlugin,
  VariantsPlugin,
  MediaQueriesPlugin,
  type CrossedBasePlugin,
  type CrossedVariantsPlugin,
  type CrossedMediaQueriesPlugin,
  type CrossedPseudoClassPlugin,
  type CrossedPseudoClassProps,
  ThemePlugin,
} from '@crossed/styled/plugins';
import { darkTheme, lightTheme } from '@crossed/ui/theme';
import type {
  CrossedThemePlugin,
  CrossedVariantsPluginProps,
} from '@crossed/styled/plugins';
import { useColorScheme } from 'react-native';

const breakpoints = { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200 };

const themes = { dark: darkTheme, light: lightTheme };

type ThemesCustom = typeof themes;

Registry.addPlugin(BasePlugin)
  .addPlugin(ThemePlugin(themes, 'dark'))
  .addPlugin(PseudoClassPlugin)
  .addPlugin(VariantsPlugin)
  .addPlugin(MediaQueriesPlugin(breakpoints));

declare module '@crossed/styled' {
  export interface StyleSheet
    extends CrossedBasePlugin,
      CrossedVariantsPlugin,
      CrossedThemePlugin,
      CrossedMediaQueriesPlugin<keyof typeof breakpoints>,
      CrossedPseudoClassPlugin {}

  export interface CrossedPropsExtended<S extends StyleSheet>
    extends CrossedVariantsPluginProps<
        S['theme'] extends (..._args: any) => any
          ? ReturnType<S['theme']>['variants'] & S['variants']
          : S['variants']
      >,
      CrossedPseudoClassProps {}
}

declare module '@crossed/styled/plugins' {
  export interface Themes extends ThemesCustom {}
}

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(app)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const [loaded, error] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  //   ...FontAwesome.font,
  // });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  // useEffect(() => {
  //   if (error) throw error;
  // }, [error]);

  useEffect(() => {
    // if (loaded) {
    SplashScreen.hideAsync();
    // }
  }, []);

  // if (!loaded) {
  //   return null;
  // }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const toto = useColorScheme();
  return (
    <CrossedUIProvider>
      <ThemeProvider value={toto === 'dark' ? DarkTheme : DefaultTheme}>
        <SafeAreaProvider>
          <Slot />
        </SafeAreaProvider>
      </ThemeProvider>
    </CrossedUIProvider>
  );
}
