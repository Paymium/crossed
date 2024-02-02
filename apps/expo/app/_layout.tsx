/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Registry } from '@crossed/styled/Registry';
import { CrossedUIProvider } from '../node_modules/@crossed/ui/src/Provider';
import FontAwesome from '@expo/vector-icons/FontAwesome';
// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
// import { useColorScheme } from 'react-native';

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
  // const colorScheme = useColorScheme();
  // console.log(CrossedUIProvider);
  return (
    <CrossedUIProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </CrossedUIProvider>
  );
}

// const Theme = ({ children }: PropsWithChildren) => {
//   // const { theme } = useCrossedTheme();
//   return (
//     <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
//       {children}
//     </ThemeProvider>
//   );
// };
