/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { YBox, MenuList, MenuItem, MenuTitle } from '@crossed/ui';
import { createStyles } from '@crossed/styled';
import { Link } from 'expo-router';

const styles = createStyles((t) => ({
  container: { base: { paddingHorizontal: 15 } },
  text: {
    base: { color: t.colors.default },
  },
  button: {
    'base': {
      paddingHorizontal: 15,
      paddingVertical: 10,
      backgroundColor: t.colors.neutral,
    },
    ':active': {
      backgroundColor: t.colors.backgroundStrong,
    },
  },
}));

export default function TabOneScreen() {
  return (
    <YBox space="lg" {...styles.container.rnw()}>
      <MenuList>
        <Link href="/button" asChild>
          <MenuItem>
            <MenuTitle>Button</MenuTitle>
          </MenuItem>
        </Link>
        <Link href="/menuList" asChild>
          <MenuItem>
            <MenuTitle>MenuList</MenuTitle>
          </MenuItem>
        </Link>
      </MenuList>
    </YBox>
  );
}
