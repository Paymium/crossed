/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { createList } from '@crossed/primitive';
import {
  composeStyles,
  createStyles,
  CrossedMethods,
  withReactive,
  // type ExtractForProps,
} from '@crossed/styled';
import { Text, type TextProps } from '../typography/Text';
import { YBox, type YBoxProps } from '../layout/YBox';
import { Divider as D } from '../layout/Divider';
import { Button, type ButtonProps } from '../forms/Button';
import { type GetProps, createScope } from '@crossed/core';
import {
  cloneElement,
  forwardRef,
  isValidElement,
  memo,
  useCallback,
} from 'react';
import { Pressable, View, type PressableProps } from 'react-native';

const useMenuList = createStyles((t) => ({
  root: {
    base: {
      alignItems: 'stretch',
    },
    variants: {},
  },
  padded: { base: { padding: t.space.xxs } },
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
    ':hover': {
      // backgroundColor: t.colors.neutral.satured,
    },
    ':active': {
      // backgroundColor: t.colors.neutral.muted,
    },
    'web': {
      ':focus': {
        // outlineColor: t.colors.neutral[600],
      },
    },
  },
  title: {
    base: { color: t.font.color },
  },
}));
type ButtonVariantProps = Partial<Pick<ButtonProps, 'variant'>>;

const MenuRoot = forwardRef(
  ({ padded = true, ...props }: MenuRootProps, ref: any) => {
    return (
      <YBox
        {...props}
        style={composeStyles(
          useMenuList.root,
          padded && useMenuList.padded,
          props.style
        )}
        ref={ref}
      />
    );
  }
);

type MenuRootProps = YBoxProps & { padded?: boolean };

const Divider = D;
const Item = withReactive(
  forwardRef<
    View,
    Omit<PressableProps, 'style'> & {
      asChild?: boolean;
      style?: CrossedMethods<any>;
    }
  >(({ asChild, style, children, ...props }, ref) => {
    const styleCallback = useCallback(
      ({ pressed }) =>
        composeStyles(useMenuList.item, style).rnw({
          active: pressed,
          // focus,
          // hover,
        }).style,
      [style]
    );
    return asChild && isValidElement(children) ? (
      cloneElement(children, {
        style: styleCallback,
      } as any)
    ) : (
      <Pressable {...props} style={styleCallback} ref={ref}>
        {children}
      </Pressable>
    );
  })
);

const Label = forwardRef((props: TextProps & ButtonVariantProps, ref: any) => {
  // const variants = useVariantContext();

  return <Text {...props} ref={ref} />;
});
const Title = (props: TextProps) => (
  <Text {...props} style={useMenuList.title} />
);
const SubTitle = Button.Text;

type ContextVariant = ButtonVariantProps & { active?: boolean };
const [ProviderVariant] = createScope<ContextVariant>({} as ContextVariant);

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
