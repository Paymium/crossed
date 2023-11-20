import {
  createButton,
  createList,
  useButtonGroupCollection,
  useButtonGroupContext,
} from '@crossed/primitive';
import { GetProps, styled } from '@crossed/styled';
import { YBox } from '@crossed/ui';
import { forwardRef } from 'react';
import { Pressable, Text, View } from 'react-native';

const Root = styled(Pressable, {
  'className': ['flex flex-col', 'px-3 py-1.5'],
  ':hover': { className: ['bg-neutral-800 cursor-pointer'] },
  ':focus': { className: ['z-10'] },
  ':disabled': { className: ['bg-neutral-800 opacity-30 cursor-not-allowed'] },
  ':active': { className: ['bg-neutral-700'] },
  'variants': {
    grouped: { true: { className: ['rounded-none'] } },
    first: { true: { className: ['rounded-l'] } },
    last: { true: { className: ['rounded-r'] } },
    orientation: { horizontal: { className: [] }, vertical: { className: [] } },
  },
  'compoundVariants': [
    {
      orientation: 'vertical',
      first: true,
      className: ['rounded-b-none rounded-t'],
    },
    {
      orientation: 'vertical',
      last: true,
      className: ['rounded-t-none rounded-b'],
    },
  ],
});

type RootProps = GetProps<typeof Root>;

const Button = createButton({
  Text: styled(Text, { className: ['text-white', 'text-base'] }),
  Element: styled(View, { className: ['flex'] }),
  Group: styled(View, {
    className: ['flex', 'border border-neutral-800 rounded-lg'],
    defaultVariants: { orientation: 'vertical' },
    variants: {
      orientation: {
        horizontal: { className: ['flex-row'] },
        vertical: { className: ['flex-col'] },
      },
    },
  }),
  Root: forwardRef((props: RootProps, ref: any) => {
    const { grouped, orientation } = useButtonGroupContext();
    const getItems = useButtonGroupCollection();
    const index = getItems().findIndex(({ id }) => id === props.id);
    return (
      <Root
        grouped={grouped}
        first={index === 0}
        last={index === getItems().length - 1}
        orientation={orientation}
        {...props}
        ref={ref}
      />
    );
  }),
});

const List = createList({
  Root: (props: GetProps<typeof Button.Group>) => (
    <Button.Group {...props} orientation={props.orientation ?? 'vertical'} />
  ),
  Item: Button,
  SubTitle: styled(Text, { className: ['text-neutral-500 text-sm'] }),
  Title: Button.Text,
  Divider: styled(View, { className: ['border-t border-neutral-800'] }),
  Label: styled(Text, {
    className: ['text-neutral-500 text-base font-bold', 'px-3 py-1.5'],
    variants: { danger: { true: { className: ['text-red-800'] } } },
  }),
});

export const CreateListPressableDemo = () => {
  return (
    <YBox space="md">
      <List>
        <List.Item>
          <List.Title>Number 1</List.Title>
          <List.SubTitle>Description Number 1</List.SubTitle>
        </List.Item>
        <List.Item>
          <List.Title>Number 2</List.Title>
          <List.SubTitle>Description 2</List.SubTitle>
        </List.Item>
        <List.Item disabled>
          <List.Title>Number 3</List.Title>
          <List.SubTitle>Number 3 have description</List.SubTitle>
        </List.Item>
        <List.Item hoverTheme={false} activeTheme={false} focusable={false}>
          <List.Title>Number 4</List.Title>
          <List.SubTitle>Number 4 have description</List.SubTitle>
        </List.Item>
        <List.Divider />
        <List.Label danger>Danger zone</List.Label>
        <List.Item hoverTheme={false} activeTheme={false} focusable={false}>
          <List.Title>Number 5</List.Title>
          <List.SubTitle>Number 5 have description</List.SubTitle>
        </List.Item>
      </List>
    </YBox>
  );
};
