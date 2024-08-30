/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { Contrast } from '@crossed/unicons';
import { Button } from '@crossed/ui';
import { useCallback } from 'react';
import { Registry } from '@crossed/styled';

export const ChangeTheme = () => {
  const onPress = useCallback(() => {
    Registry.setThemeName(Registry.themeName === 'light' ? 'dark' : 'light');
  }, []);
  return (
    <Button variant="tertiary" onPress={onPress}>
      <Button.Icon>
        <Contrast />
      </Button.Icon>
    </Button>
  );
};
