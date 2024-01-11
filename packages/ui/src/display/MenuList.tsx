'use client';
import { createList } from '@crossed/primitive';
import { styled, useStyles } from '@crossed/styled';
import { Text, TextProps } from '../typography/Text';
import { YBox } from '../layout/YBox';
import { Divider as D } from '../layout/Divider';
import { Button, ButtonProps } from '../forms/Button';
import { GetProps, createScope } from '@crossed/core';
import type { ExtractVariant } from '@crossed/styled/src/types';
import { forwardRef, memo } from 'react';

type ButtonVariantProps = ExtractVariant<typeof Button.styleSheet>;

const MenuRoot = styled(YBox, () => ({
  alignItems: 'stretch',
}));
type MenuRootProps = GetProps<typeof MenuRoot>;

const Divider = styled(D, {});
const Item = forwardRef((props: ButtonProps, ref) => {
  const context = useVariantContext();
  return <Button {...context} {...props} ref={ref} />;
});

const Label = forwardRef((props: TextProps & ButtonVariantProps, ref) => {
  const context = useVariantContext();
  const { styles } = useStyles(Button.styleSheet as any, {
    ...context,
    ...props,
  });

  return (
    <Text
      {...props}
      style={[
        styles.base,
        styles.base.extraStyle({ ...context, ...props }, {}),
        props.style,
      ]}
      ref={ref}
    />
  );
});
const Title = styled(Button.Text, {});
const SubTitle = styled(Button.Text, {});

type ContextVariant = ButtonVariantProps;
const [ProviderVariant, useVariantContext] = createScope<ContextVariant>({});

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
