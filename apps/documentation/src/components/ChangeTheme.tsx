/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { Sun } from '@crossed/unicons/Sun';
import { Moon } from '@crossed/unicons/Moon';
import { Select, Text } from '@crossed/ui';
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
        <Select.Option value="light">
          <Moon />
        </Select.Option>
        <Select.Option value="dark">
          <Sun />
        </Select.Option>
        <Select.Option value="paymium">
          <Text>Paymium</Text>
        </Select.Option>
      </Select.Content>
    </Select>
    // <Button
    //   onPress={onPress}
    //   variant={false}
    //   accessibilityLabel={`Change to ${
    //     Registry.themeName === 'light' ? 'dark' : 'light'
    //   } theme`}
    // >
    //   <ButtonIcon>
    //     {Registry.themeName === 'light' ? <Moon /> : <Sun />}
    //   </ButtonIcon>
    // </Button>
  );
};
