/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { YBox, MenuList } from '@crossed/ui';
import {
  createStyles,
  rnw,
  // pressable,
  // Registry,
  withReactive,
} from '@crossed/styled';
// import { memo } from 'react';
import { Link } from 'expo-router';
import { ChevronRight } from '@crossed/unicons';
// import { View, Text, Pressable } from 'react-native';

const styles = createStyles((t) => ({
  container: { base: { padding: 15 } },
  text: { base: { color: t.colors.text.primary } },
  item: {
    'base': {
      justifyContent: 'space-between',
      backgroundColor: t.colors.background.primary,
    },
    ':active': { backgroundColor: 'gray' },
  },
  dynamic(opacity: number, size: number = 16) {
    return {
      opacity,
      fontSize: size,
    };
  },
}));

export default withReactive(function TabOneScreen() {
  const { style } = rnw(styles.item);
  // const style = (({ pressed }: { pressed: boolean }) =>
  //   styles.item.rnw({ active: pressed }).style) as any;

  return (
    <YBox space="lg" style={styles.container}>
      <MenuList>
        <Link href="/button" asChild style={style}>
          <MenuList.Item>
            <MenuList.Title>Button</MenuList.Title>
            <ChevronRight />
          </MenuList.Item>
        </Link>
        {/* <Link href="/input" asChild style={style}>
          <MenuItem>
            <MenuTitle>Input</MenuTitle>
            <ChevronRight />
          </MenuItem>
        </Link>
        <Link href="/radio" asChild style={style}>
          <MenuItem>
            <MenuTitle>Radio</MenuTitle>
            <ChevronRight />
          </MenuItem>
        </Link>
        <Link href="/checkbox" asChild style={style}>
          <MenuItem>
            <MenuTitle>Checkbox</MenuTitle>
            <ChevronRight />
          </MenuItem>
        </Link>
        <Link href="/menuList" asChild style={style}>
          <MenuItem>
            <MenuTitle>MenuList</MenuTitle>
            <ChevronRight />
          </MenuItem>
        </Link>
        <Link href="/select" asChild style={style}>
          <MenuItem>
            <MenuTitle>Select</MenuTitle>
            <ChevronRight />
          </MenuItem>
        </Link>
        <Link href="/accordion" asChild style={style}>
          <MenuItem>
            <MenuTitle>Accordion</MenuTitle>
            <ChevronRight />
          </MenuItem>
        </Link> */}
      </MenuList>
    </YBox>
  );
});
