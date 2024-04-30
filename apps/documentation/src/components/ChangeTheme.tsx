/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { Sun } from '@crossed/unicons/Sun';
import { Moon } from '@crossed/unicons/Moon';
import { Select } from '@crossed/ui';
import { useCallback } from 'react';
import { Registry } from '@crossed/styled';

export const ChangeTheme = () => {
  const onPress = useCallback((e) => {
    Registry.setThemeName(e);
  }, []);
  return (
    <Select defaultValue={Registry.themeName} onChange={onPress}>
      <Select.Trigger>
        <Select.Value />
      </Select.Trigger>
      <Select.Content>
        <Select.Option value="dark">
          <Moon />
        </Select.Option>
        <Select.Option value="light">
          <Sun />
        </Select.Option>
      </Select.Content>
    </Select>
  );
};
