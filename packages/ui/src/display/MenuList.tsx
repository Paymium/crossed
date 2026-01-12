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
import { ItemList, ListProps } from './ItemList';
import { DividerProps } from '../layout';

const menuItemStyles = createStyles((t) => ({
  item: {
    base: {
      borderRadius: 12,
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
    return <ItemList {...props} ref={ref} />;
  })
);
MenuRoot.displayName = 'MenuList';

const MenuDivider = (props: DividerProps) => <ItemList.Divider {...props} />;
MenuDivider.displayName = 'MenuList.Divider';

export type MenuListItemProps = Omit<PressableProps, 'style'> & {
  style?: CrossedMethods<any>;
};
const MenuItem = withReactive<MenuListItemProps>(
  ({ style, children, ...props }: MenuListItemProps) => {
    return (
      <Pressable role="listitem" {...props}>
        {({
          hovered,
          pressed,
          focused,
        }: {
          pressed: boolean;
          hovered: boolean;
          focused: boolean;
        }) => (
          <ItemList.Item
            style={composeStyles(
              menuItemStyles.item,
              hovered && menuItemStyles.hover,
              pressed && menuItemStyles.active,
              focused && menuItemStyles.focus,
              style
            )}
          >
            {typeof children === 'function'
              ? children({ hovered, pressed, focused } as any)
              : children}
          </ItemList.Item>
        )}
      </Pressable>
    );
  }
);
MenuItem.displayName = 'MenuList.Item';

const MenuLabel = ({ style, ...props }: ComponentProps<typeof Text>) => (
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
