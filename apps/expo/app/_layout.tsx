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
} from '@crossed/styled/plugins';
import { darkTheme } from '@crossed/ui/theme';
import type { CrossedVariantsPluginProps } from '@crossed/styled/plugins';

const breakpoints = { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200 };

Registry.setTheme(darkTheme)
  .addPlugin(BasePlugin)
  .addPlugin(PseudoClassPlugin)
  .addPlugin(VariantsPlugin)
  .addPlugin(MediaQueriesPlugin(breakpoints));

type Theme = typeof darkTheme;

declare module '@crossed/styled' {
  // export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface CrossedstyleTheme extends Theme {}

  export interface StyleSheet
    extends CrossedBasePlugin,
      CrossedVariantsPlugin,
      CrossedMediaQueriesPlugin<keyof typeof breakpoints>,
      CrossedPseudoClassPlugin {}

  export interface CrossedPropsExtended<S extends StyleSheet>
    extends CrossedVariantsPluginProps<S['variants']>,
      CrossedPseudoClassProps {}
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
  return (
    <CrossedUIProvider>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </CrossedUIProvider>
  );
}
