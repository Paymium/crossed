import {
  GetProps,
  createScope,
  styled,
  tw,
  withStaticProperties,
} from '@mergeui/core';
import {
  useId,
  type ReactNode,
  Fragment,
  PropsWithChildren,
  cloneElement,
} from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '../typography/Text';
import { Divider } from '../layout/Divider';
import { colorVariants, spaceVariants } from '../variants';
import { YBox } from '../layout/YBox';

type Context = {
  color?: keyof typeof colorVariants;
};

const [Provider, useContext] = createScope<Context>({} as Context);

const MenuRootFrame = styled(View, {
  className: ['overflow-hidden', 'rounded'],
});

const MenuItemFrame = styled(Pressable, {
  'className': ['px-3', 'py-2', 'flex-row', 'items-center'],
  'props': {
    role: 'button',
  },
  ':disabled': {
    className: ['opacity-50', 'pointer-events-none'],
  },
  'variants': {
    color: colorVariants,
    space: spaceVariants,
  },
  'defaultVariants': {
    color: 'zinc',
    space: 'sm',
  },
});

const MenuItemTitle = styled(Text, {
  props: {
    weight: 'semibold',
  },
});

const MenuItemSubtitle = styled(Text, {
  className: ['dark:text-zinc-500'],
});

type MenuRootProps = { separator?: ReactNode } & GetProps<
  typeof MenuRootFrame
> &
  Pick<GetProps<typeof MenuItemFrame>, 'color'>;

const MenuRoot = ({
  children,
  separator = <Divider direction="horizontal" />,
  color,
  ...props
}: MenuRootProps) => {
  const id = useId();
  return (
    <Provider color={color}>
      <MenuRootFrame {...props}>
        {Array.isArray(children)
          ? children.map((c, i) => {
              return (
                <Fragment key={`${id}-${i}`}>
                  {c}
                  {i + 1 !== children.length && separator}
                </Fragment>
              );
            })
          : children}
      </MenuRootFrame>
    </Provider>
  );
};

type MenuItemProps = PropsWithChildren<
  {
    title?: string;
    subtitle?: string;
    icon?: ReactNode;
    iconAfter?: ReactNode;
    disabled?: boolean;
  } & Omit<GetProps<typeof MenuItemFrame>, 'children'>
>;

function MenuItem(
  props: Omit<MenuItemProps, 'children'> &
    Required<Pick<MenuItemProps, 'title'>>
): ReactNode;
function MenuItem(
  props: Omit<MenuItemProps, 'subtitle' | 'title'> &
    Required<Pick<MenuItemProps, 'children'>>
): ReactNode;
function MenuItem({
  children,
  title,
  subtitle,
  icon,
  iconAfter,
  ...props
}: MenuItemProps) {
  const { color } = useContext();
  const classNames = MenuItemTitle.styles();
  const style = tw.style(classNames);

  return (
    <MenuItemFrame color={color} {...props}>
      {icon && cloneElement(icon as any, { color: style.color })}
      <YBox className="flex-1">
        {children ?? (
          <>
            {title && <MenuItemTitle>{title}</MenuItemTitle>}
            {subtitle && <MenuItemSubtitle>{subtitle}</MenuItemSubtitle>}
          </>
        )}
      </YBox>
      {iconAfter && cloneElement(iconAfter as any, { color: style.color })}
    </MenuItemFrame>
  );
}

export const Menu = withStaticProperties(MenuRoot, {
  displayName: 'Menu',
  Item: withStaticProperties(MenuItem, {
    Title: MenuItemTitle,
    Subtitle: MenuItemSubtitle,
  }),
});
