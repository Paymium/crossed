/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Sun, Moon } from '@crossed/unicons';
import { Registry, createStyles } from '@crossed/styled';
import { Button, ButtonIcon } from '@crossed/ui';
import { Stack } from 'expo-router';
import { useCallback } from 'react';
import { Appearance } from 'react-native';
import { useInteraction } from '@crossed/styled/plugins';

const styles = createStyles((t) => ({
  buttonTheme: {
    ':active': { backgroundColor: t.colors.neutral.hover },
  },
}));

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

const ChangeTheme = () => {
  const { state, props } = useInteraction();
  const onPress = useCallback(() => {
    const theme = Registry.themeName === 'dark' ? 'light' : 'dark';
    Registry.setThemeName(theme);
    Appearance.setColorScheme(theme);
  }, []);
  return (
    <Button
      onPress={onPress}
      {...props}
      variant={false}
      accessibilityLabel={`Change to ${
        Registry.themeName === 'light' ? 'dark' : 'light'
      } theme`}
      {...styles.buttonTheme.rnw({ active: state.active })}
    >
      <ButtonIcon>
        {Registry.themeName === 'light' ? <Moon /> : <Sun />}
      </ButtonIcon>
    </Button>
  );
};
export default function TabLayout() {
  return <Stack screenOptions={{ headerRight: ChangeTheme }} />;
}
