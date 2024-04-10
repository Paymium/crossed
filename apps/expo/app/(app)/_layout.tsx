/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Sun, Moon } from '@crossed/unicons';
import { Registry } from '@crossed/styled';
import { Button } from '@crossed/ui';
import { Stack } from 'expo-router';
import { useCallback } from 'react';
import { Appearance } from 'react-native';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

const ChangeTheme = () => {
  const onPress = useCallback(() => {
    const theme = Registry.themeName === 'dark' ? 'light' : 'dark';
    Registry.setThemeName(theme);
    Appearance.setColorScheme(theme);
  }, []);

  return (
    <Button
      onPress={onPress}
      // variant="ghost"
      accessibilityLabel={`Change to ${
        Registry.themeName === 'light' ? 'dark' : 'light'
      } theme`}
    >
      {Registry.themeName === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};
export default function TabLayout() {
  return <Stack screenOptions={{ headerRight: ChangeTheme }} />;
}
