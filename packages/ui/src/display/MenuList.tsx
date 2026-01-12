/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { composeStyles, createStyles, withReactive } from '@crossed/styled';
import { Text, TextProps } from '../typography/Text';
import { withStaticProperties } from '@crossed/core';
import { ComponentProps, forwardRef, memo, RefAttributes } from 'react';
import { View } from 'react-native';
import { ItemList, ListProps } from './ItemList';
import { DividerProps } from '../layout';

const menuItemStyles = createStyles((t) => ({
  item: {
    base: {
      borderRadius: 12,
    },
  },
  pressable: {
    ':hover': { backgroundColor: t.colors.background.hover },
    ':active': {
      backgroundColor: t.colors.background.active,
    },
    'web': {
      base: { transition: 'all 170ms ease' },
      ':focus-visible': {
        outlineColor: t.colors.border.brand,
      },
    },
  },
}));

const MenuRoot = memo<ListProps & RefAttributes<View>>(
  forwardRef<View, ListProps>(({ ...props }: ListProps, ref: any) => {
    return <ItemList {...props} ref={ref} />;
  })
);
MenuRoot.displayName = 'MenuList';

const MenuDivider = (props: DividerProps) => <ItemList.Divider {...props} />;
MenuDivider.displayName = 'MenuList.Divider';

export type MenuListItemProps = ComponentProps<typeof ItemList.Item>;

const MenuItem = withReactive<MenuListItemProps>(
  ({ style, children, pressable = true, ...props }: MenuListItemProps) => {
    return (
      <ItemList.Item
        {...(props as any)}
        pressable={pressable}
        style={composeStyles(
          pressable && menuItemStyles.pressable,
          menuItemStyles.item,
          style
        )}
      >
        {children}
      </ItemList.Item>
    );
  }
);
MenuItem.displayName = 'MenuList.Item';

const MenuLabel = ({ ...props }: ComponentProps<typeof Text>) => (
  <ItemList.Label {...props} />
);
MenuLabel.displayName = 'MenuList.Label';
const MenuTitle = (props: TextProps) => (
  <ItemList.Title color="secondary" {...props} />
);
MenuTitle.displayName = 'MenuList.Title';

const MenuList = withStaticProperties(MenuRoot, {
  Divider: MenuDivider,
  Item: MenuItem,
  Label: MenuLabel,
  Title: MenuTitle,
});
MenuList.displayName = 'MenuList';

export { MenuList, MenuDivider, MenuItem, MenuLabel, MenuTitle };
