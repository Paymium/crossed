/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { Sun } from '@crossed/unicons/Sun';
import { Moon } from '@crossed/unicons/Moon';
import { Button, ButtonIcon } from '@crossed/ui';
import { useCallback } from 'react';
import { Registry } from '@crossed/styled';

export const ChangeTheme = () => {
  const onPress = useCallback(() => {
    Registry.setThemeName(Registry.themeName === 'dark' ? 'light' : 'dark');
  }, []);
  return (
    <Button
      onPress={onPress}
      variant={false}
      accessibilityLabel={`Change to ${
        Registry.themeName === 'light' ? 'dark' : 'light'
      } theme`}
    >
      <ButtonIcon>
        {Registry.themeName === 'light' ? <Moon /> : <Sun />}
      </ButtonIcon>
    </Button>
  );
};
