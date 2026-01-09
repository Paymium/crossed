/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import {
  composeStyles,
  createStyles,
  CrossedMethods,
  withReactive,
} from '@crossed/styled';
import { Text, TextProps } from '../typography/Text';
import { withStaticProperties } from '@crossed/core';
import { ComponentProps, forwardRef, memo, RefAttributes } from 'react';
import { Pressable, View, type PressableProps } from 'react-native';
import { List, ListItem, ListProps } from './List';
import { DividerProps } from '../layout';

const menuItemStyles = createStyles((t) => ({
  item: {
    base: {
      borderRadius: 12,
      paddingHorizontal: t.space.xl,
    },
  },
  hover: {
    base: {
      backgroundColor: t.colors.background.hover,
    },
  },
  active: {
    base: { backgroundColor: t.colors.background.active },
  },
  focus: {
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
    return <List {...props} ref={ref} />;
  })
);
MenuRoot.displayName = 'MenuList';

const MenuDivider = (props: DividerProps) => <List.Divider {...props} />;
MenuDivider.displayName = 'MenuList.Divider';

export type MenuListItemProps = Omit<PressableProps, 'style' | 'children'> & {
  style?: CrossedMethods<any>;
  children: React.ReactNode;
};
const MenuItem = withReactive<MenuListItemProps>(
  forwardRef<View, MenuListItemProps>(
    ({ style, children, ...props }: MenuListItemProps, ref) => {
      return (
        <Pressable role="listitem" {...props} ref={ref}>
          {({
            hovered,
            pressed,
            focused,
          }: {
            pressed: boolean;
            hovered: boolean;
            focused: boolean;
          }) => (
            <ListItem
              style={composeStyles(
                menuItemStyles.item,
                hovered && menuItemStyles.hover,
                pressed && menuItemStyles.active,
                focused && menuItemStyles.focus,
                style
              )}
            >
              {children}
            </ListItem>
          )}
        </Pressable>
      );
    }
  )
);
MenuItem.displayName = 'MenuList.Item';

const MenuLabel = ({ style, ...props }: ComponentProps<typeof Text>) => (
  <List.Label {...props} />
);
MenuLabel.displayName = 'MenuList.Label';
const MenuTitle = (props: TextProps) => (
  <List.Title color="secondary" {...props} />
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
