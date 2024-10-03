/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React from 'react';
import { MenuList, MenuItem } from '@crossed/ui';
import { createStyles } from '@crossed/styled';
import { ChevronRight } from '@crossed/unicons';
import { FlatList } from 'react-native';
import { IndexScreenProps, RootStackParamList } from '../routes';

const styles = createStyles((t) => ({
  container: { base: { paddingHorizontal: 15 } },
  item: {
    'base': {
      width: '100%',
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: t.colors.background.secondary,
    },
    ':active': { backgroundColor: t.colors.background.active },
  },
}));

type Menu = { to: keyof RootStackParamList; title: string };

const menus: Menu[] = [
  { to: '/button', title: 'Button' },
  { to: '/banner', title: 'Banner' },
  { to: '/alert', title: 'Alert' },
  { to: '/input', title: 'Input' },
  { to: '/radio', title: 'Radio' },
  { to: '/checkbox', title: 'Checkbox' },
  { to: '/select', title: 'Select' },
  { to: '/accordion', title: 'Accordion' },
] as const;

export default function TabOneScreen({ navigation }: IndexScreenProps) {
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
