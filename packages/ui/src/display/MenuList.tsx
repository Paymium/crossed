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
  inlineStyle,
  withReactive,
} from '@crossed/styled';
import { Text, TextProps } from '../typography/Text';
import { YBox, type YBoxProps } from '../layout/YBox';
import { Divider as D, DividerProps } from '../layout/Divider';
import { withStaticProperties } from '@crossed/core';
import {
  cloneElement,
  ComponentProps,
  forwardRef,
  isValidElement,
  memo,
  RefAttributes,
  useCallback,
} from 'react';
import { Pressable, View, type PressableProps } from 'react-native';

const rootStyle = createStyles(({ colors, space }) => ({
  default: {
    base: {
      backgroundColor: colors.background.secondary,
      borderRadius: 12,
    },
  },
  border: {
    base: {
      borderWidth: 1,
      borderColor: colors.border.primary,
    },
  },
  padded: { base: { padding: space.xs } },
}));
const itemStyles = createStyles((t) => ({
  padding: {
    base: {
      paddingTop: t.space.xs,
      paddingBottom: t.space.xs,
      paddingLeft: t.space.md,
      paddingRight: t.space.md,
    },
  },
  item: {
    'base': {
      display: 'flex',
      flexDirection: 'column',
      // alignItems: 'center',
      paddingHorizontal: t.space.md,
      justifyContent: 'center',
      // height: 42,
      borderWidth: 0,
      borderRadius: 12,
    },
    ':hover': {
      backgroundColor: t.colors.background.hover,
    },
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

const MenuRoot = memo<MenuListProps & RefAttributes<View>>(
  forwardRef<View, MenuListProps>(
    ({ padded = true, bordered = true, ...props }: MenuListProps, ref: any) => {
      return (
        <YBox
          role="list"
          alignItems={'stretch'}
          space={padded ? 'xxs' : undefined}
          {...props}
          style={composeStyles(
            rootStyle.default,
            bordered && rootStyle.border,
            padded && rootStyle.padded,
            props.style
          )}
          ref={ref}
        />
      );
    }
  )
);
MenuRoot.displayName = 'MenuList';

export type MenuListProps = YBoxProps & {
  /**
   * Apply padding
   */
  padded?: boolean;
  /**
   * Apply border
   */
  bordered?: boolean;
};

const MenuDivider = (props: DividerProps) => <D {...props} />;
MenuDivider.displayName = 'MenuList.Divider';

export type MenuListItemProps = Omit<PressableProps, 'style'> & {
  asChild?: boolean;
  style?: CrossedMethods<any>;
};
const MenuItem = withReactive<MenuListItemProps>(
  forwardRef<View, MenuListItemProps>(
    ({ asChild, style, children, ...props }: MenuListItemProps, ref) => {
      const styleCallback = useCallback(
        ({ pressed }) =>
          composeStyles(itemStyles.item, itemStyles.padding, style).rnw({
            active: pressed,
          }).style,
        [style]
      );
      return asChild && isValidElement(children) ? (
        cloneElement(children, {
          style: styleCallback,
          role: 'listitem',
        } as any)
      ) : (
        <Pressable role="listitem" {...props} style={styleCallback} ref={ref}>
          {children}
        </Pressable>
      );
    }
  )
);
MenuItem.displayName = 'MenuList.Item';

const MenuLabel = ({ style, ...props }: ComponentProps<typeof Text>) => (
  <Text
    {...props}
    style={composeStyles(
      itemStyles.padding,
      inlineStyle(() => ({ base: { marginTop: 0 } })),
      style
    )}
  />
);
MenuLabel.displayName = 'MenuList.Label';
const MenuTitle = (props: TextProps) => <Text color="secondary" {...props} />;
MenuTitle.displayName = 'MenuList.Title';

const MenuList = withStaticProperties(MenuRoot, {
  Divider: MenuDivider,
  Item: MenuItem,
  Label: MenuLabel,
  Title: MenuTitle,
});
MenuList.displayName = 'MenuList';

export { MenuList, MenuDivider, MenuItem, MenuLabel, MenuTitle };
