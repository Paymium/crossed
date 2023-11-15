import { createList } from '@crossed/primitive';
import { GetProps, tw, useCrossedTheme } from '@crossed/styled';
import { styled } from '@crossed/styled';
import { Fragment, ReactElement, ReactNode, cloneElement, useId } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Divider } from '../layout/Divider';
import { YBox } from '../layout/YBox';
import { colorVariants } from '../variants/colors';
import { createScope } from '@crossed/core';
import { ButtonFrame } from '../forms/Button';

const ListRootFrame = styled(View, {
  'className': [
    'border rounded-md overflow-hidden flex-col p-0 gap-0 items-stretch',
  ],
  ':dark': { className: ['border-neutral-800'] },
  ':light': { className: ['border-neutral-200'] },
});

type ListRootFrameProps = GetProps<typeof ListRootFrame>;

const ListTitleFrame = styled(Text, {
  className: ['font-semibold text-white'],
});

const ListSubTitleFrame = styled(Text, {
  className: ['font-normal text-neutral-400'],
});

const ListItemFrame = styled(Pressable, {
  'props': { role: 'button', disabled: true },
  'extends': ButtonFrame.styles,
  'className': ['flex flex-row items-center rounded-none border-0'],
  ':disabled': { className: ['opacity-50'] },
  'variants': {
    color: colorVariants,
    pressable: {
      true: {
        props: { disabled: false },
      },
    },
  },
});

type ListItemFrameProps = GetProps<typeof ListItemFrame>;

type ListItemProps = Omit<ListItemFrameProps, 'children'> & {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  icon?: ReactElement;
  iconAfter?: ReactElement;
  disabled?: boolean;
};

type Context = {
  color: ListItemFrameProps['color'];
  size: ListItemFrameProps['size'];
};
const [Provider, useContext] = createScope<Context>({} as Context);

const List = createList({
  Root: ({
    children,
    color = 'neutral',
    size = 'md',
    ...props
  }: ListRootFrameProps & Partial<Context>) => {
    const id = useId();
    return (
      <Provider color={color} size={size}>
        <ListRootFrame {...props}>
          {Array.isArray(children)
            ? children.map((c, i) => {
                return (
                  <Fragment key={`${id}-${i}`}>
                    {c}
                    {i + 1 !== children.length && (
                      <Divider direction="horizontal" />
                    )}
                  </Fragment>
                );
              })
            : children}
        </ListRootFrame>
      </Provider>
    );
  },
  Item: ({
    children,
    title,
    subtitle,
    icon,
    iconAfter,
    ...props
  }: ListItemProps) => {
    const { color, size } = useContext();
    const { theme } = useCrossedTheme();
    const textStyle = ListTitleFrame.styles();
    const classNames = textStyle[`:${theme}`]?.className || textStyle.className;
    const style = tw.style(classNames);

    return (
      <ListItemFrame color={color} size={size} {...(props as any)}>
        {icon &&
          cloneElement(icon as any, {
            color:
              icon.props.color === 'currentColor'
                ? style.color
                : icon.props.color ?? style.color,
          })}
        <YBox className="flex-1">
          {children ?? (
            <>
              {title && <ListTitleFrame>{title}</ListTitleFrame>}
              {subtitle && <ListSubTitleFrame>{subtitle}</ListSubTitleFrame>}
            </>
          )}
        </YBox>
        {iconAfter &&
          cloneElement(iconAfter as any, {
            color:
              iconAfter.props.color === 'currentColor'
                ? style.color
                : iconAfter.props.color ?? style.color,
          })}
      </ListItemFrame>
    );
  },
  SubTitle: ListSubTitleFrame,
  Title: ListTitleFrame,
});

const { Title: ListTitle, SubTitle: ListSubTitle, Item: ListItem } = List;

export { List, ListTitle, ListSubTitle, ListItem };
