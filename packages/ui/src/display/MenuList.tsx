/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { createList } from '@crossed/primitive';
import { createStyles } from '@crossed/styled';
import { Text, type TextProps } from '../typography/Text';
import { YBox, type YBoxProps } from '../layout/YBox';
import { Divider as D } from '../layout/Divider';
import { Button, useButton, type ButtonProps } from '../forms/Button';
import { type GetProps, createScope } from '@crossed/core';
import { forwardRef, memo } from 'react';

const useMenuList = createStyles(() => ({
  root: {
    base: {
      alignItems: 'stretch',
    },
  },
}));
type ButtonVariantProps = Partial<Pick<ButtonProps, 'size' | 'variant'>>;

const MenuRoot = forwardRef((props: MenuRootProps, ref: any) => {
  return <YBox {...props} {...useMenuList.root.rnw(props)} ref={ref} />;
});

type MenuRootProps = YBoxProps;

const Divider = D;
const Item = Button;

const Label = forwardRef((props: TextProps & ButtonVariantProps, ref: any) => {
  const variants = useVariantContext();

  return (
    <Text
      {...props}
      {...useButton.button.rnw({ ...props, variants })}
      ref={ref}
    />
  );
});
const Title = Button.Text;
const SubTitle = Button.Text;

type ContextVariant = ButtonVariantProps;
const [ProviderVariant, useVariantContext] = createScope<ContextVariant>(
  {} as ContextVariant
);

const MenuList = createList({
  Root: memo(
    forwardRef((props: MenuRootProps & ButtonVariantProps, ref: any) => (
      <ProviderVariant
        // color={props.color}
        size={props.size}
        variant={props.variant || 'ghost'}
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
