/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { YBox, MenuList, MenuItem, MenuTitle } from '@crossed/ui';
import { createStyles } from '@crossed/styled';
import { Link } from 'expo-router';
import { ChevronRight } from '@crossed/unicons';

const styles = createStyles((t) => ({
  container: { base: { paddingHorizontal: 15 } },
  item: {
    'base': {
      justifyContent: 'space-between',
      backgroundColor: t.colors.neutral.default,
    },
    ':active': { backgroundColor: t.colors.neutral.active },
  },
}));

export default function TabOneScreen() {
  const style = (({ pressed }: { pressed: boolean }) =>
    styles.item.rnw({ active: pressed }).style) as any;
  return (
    <YBox space="lg" {...styles.container.rnw()}>
      <MenuList>
        <Link href="/button" asChild style={style}>
          <MenuItem>
            <MenuTitle>Button</MenuTitle>
            <ChevronRight />
          </MenuItem>
        </Link>
        <Link href="/input" asChild style={style}>
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
      </MenuList>
    </YBox>
  );
}
