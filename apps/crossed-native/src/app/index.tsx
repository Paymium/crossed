/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React from 'react';
import { MenuList, MenuItem } from '@crossed/ui';
import { createStyles, useTheme } from '@crossed/styled';
import { ChevronRight } from '@crossed/unicons';
import { FlatList } from 'react-native';
import { IndexScreenProps, RootStackParamList } from '../routes';

const styles = createStyles((t) => ({
  container: { base: { paddingHorizontal: 15 } },
  item: {
    'base': {
      width: '100%',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      // backgroundColor: t.colors.background.secondary,
    },
    ':active': {
      // backgroundColor: t.colors.background.active
    },
  },
}));

type Menu = { to: keyof RootStackParamList; title: string };

const menus: Menu[] = [
  { to: '/accordion', title: 'Accordion' },
  { to: '/alert', title: 'Alert' },
  { to: '/banner', title: 'Banner' },
  { to: '/button', title: 'Button' },
  { to: '/checkbox', title: 'Checkbox' },
  { to: '/input', title: 'Input' },
  { to: '/radio', title: 'Radio' },
  { to: '/select', title: 'Select' },
  { to: '/sheet', title: 'Sheet' },
  { to: '/tooltip', title: 'Tooltip' },
  { to: '/modal', title: 'Modal' },
  { to: '/calendar', title: 'Calendar' },
  { to: '/dateInput', title: 'DateInput' },
] as const;

export default function TabOneScreen({ navigation }: IndexScreenProps) {
  useTheme();
  return (
    <MenuList>
      <FlatList
        data={menus}
        renderItem={({ item }) => {
          return (
            <MenuItem
              style={styles.item}
              onPress={() => navigation.navigate(item.to)}
            >
              <MenuList.Title>{item.title}</MenuList.Title>
              <ChevronRight />
            </MenuItem>
          );
        }}
      />
    </MenuList>
  );
}
