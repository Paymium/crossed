/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { createList } from '@crossed/primitive';
import {
  createStyles,
  withReactive,
  type ExtractForProps,
} from '@crossed/styled';
import { Text, type TextProps } from '../typography/Text';
import { YBox, type YBoxProps } from '../layout/YBox';
import { Divider as D } from '../layout/Divider';
import { Button, useButton, type ButtonProps } from '../forms/Button';
import { type GetProps, createScope } from '@crossed/core';
import { forwardRef, memo } from 'react';
import { Pressable, View, type PressableProps } from 'react-native';

const useMenuList = createStyles((t) => ({
  root: {
    base: {
      alignItems: 'stretch',
      paddingVertical: t.space.xxs,
      paddingHorizontal: t.space.xxs,
    },
  },
  item: {
    'base': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: t.space.xs,
      justifyContent: 'flex-start',
      height: 42,
      // backgroundColor: 'transparent',
      borderWidth: 0,
      borderRadius: 5,
    },
    ':hover': { backgroundColor: t.colors.neutral.satured },
    ':active': { backgroundColor: t.colors.neutral.muted },
    'web': {
      ':focus': { outlineColor: t.colors.neutral[600] },
    },
  },
}));
type ButtonVariantProps = Partial<Pick<ButtonProps, 'variant'>>;

const MenuRoot = forwardRef((props: MenuRootProps, ref: any) => {
  return (
    <YBox
      {...props}
      style={[useMenuList.root.rnw().style, props.style]}
      ref={ref}
    />
  );
});

type MenuRootProps = YBoxProps;

const Divider = D;
const Item = withReactive(
  forwardRef<
    View,
    PressableProps & Omit<ExtractForProps<typeof useMenuList.item>, 'variants'>
  >(({ active, focus, hover, ...props }, ref) => {
    return (
      <Pressable
        {...props}
        style={({ pressed }) =>
          useMenuList.item.rnw({
            active: active ?? pressed,
            focus,
            hover,
            style:
              typeof props.style === 'function'
                ? props.style({ pressed })
                : (props.style as any),
          }).style
        }
        ref={ref}
      />
    );
  })
);

const Label = forwardRef((props: TextProps & ButtonVariantProps, ref: any) => {
  const variants = useVariantContext();

  return (
    <Text
      {...props}
      {...useButton.root.rnw({ ...props, variants })}
      ref={ref}
    />
  );
});
const Title = Button.Text;
const SubTitle = Button.Text;

type ContextVariant = ButtonVariantProps & { active?: boolean };
const [ProviderVariant, useVariantContext] = createScope<ContextVariant>(
  {} as ContextVariant
);

const MenuList = createList({
  Root: memo(
    forwardRef((props: MenuRootProps & ButtonVariantProps, ref: any) => (
      <ProviderVariant
        // color={props.color}
        // size={props.size}
        variant={props.variant || undefined}
        active={props.active || undefined}
      >
        <MenuRoot {...props} ref={ref} />
      </ProviderVariant>
    ))
  ),
  Divider: Divider,
  Item: Item,
  Label: Label,
  SubTitle: SubTitle,
  Title: Title,
});

const {
  Divider: MenuDivider,
  Item: MenuItem,
  Label: MenuLabel,
  Title: MenuTitle,
  SubTitle: MenuSubTitle,
} = MenuList;

export type MenuListProps = GetProps<typeof MenuList>;
export type MenuItemProps = GetProps<typeof MenuItem>;

export { MenuList, MenuDivider, MenuItem, MenuLabel, MenuTitle, MenuSubTitle };
