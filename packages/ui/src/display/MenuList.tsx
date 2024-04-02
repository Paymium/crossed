/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { createList } from '@crossed/primitive';
import { withStyle, useStyles } from '@crossed/styled';
import { Text, type TextProps } from '../typography/Text';
import { YBox } from '../layout/YBox';
import { Divider as D } from '../layout/Divider';
import { Button, type ButtonProps } from '../forms/Button';
import { type GetProps, createScope } from '@crossed/core';
import { forwardRef, memo } from 'react';

type ButtonVariantProps = Partial<
  Pick<ButtonProps['variants'], 'size' | 'color' | 'variant'>
>;
const MenuRoot = withStyle(YBox, {
  base: {
    alignItems: 'stretch',
  },
});
type MenuRootProps = GetProps<typeof MenuRoot>;

const Divider = withStyle(D, { base: {} });
const Item = Button;

const Label = forwardRef((props: TextProps & ButtonVariantProps, ref) => {
  const context = useVariantContext();
  const { root } = useStyles(Button.styleSheet, {
    ...context,
    ...props,
  });

  return <Text {...props} style={[root.style, props.style]} ref={ref} />;
});
const Title = withStyle(Button.Text, { base: {} });
const SubTitle = withStyle(Button.Text, { base: {} });

type ContextVariant = ButtonVariantProps;
const [ProviderVariant, useVariantContext] = createScope<ContextVariant>(
  {} as ContextVariant
);

const MenuList = createList({
  Root: memo(
    forwardRef((props: MenuRootProps & ButtonVariantProps, ref) => (
      <ProviderVariant
        color={props.color}
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
