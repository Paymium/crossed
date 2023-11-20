import { createList } from '@crossed/primitive';
import { styled } from '@crossed/styled';
import { YBox } from '@crossed/ui';
import { Text, View } from 'react-native';

const List = createList({
  Root: styled(View, { className: ['border border-neutral-800 rounded-lg'] }),
  Item: styled(View, { className: ['py-2 px-3'] }),
  SubTitle: styled(Text, { className: ['text-neutral-500 text-sm'] }),
  Title: styled(Text, { className: ['text-white text-base font-semibold'] }),
  Divider: styled(View, { className: ['border-t border-neutral-800'] }),
  Label: styled(Text, { className: ['text-white text-base font-bold'] }),
});

export const CreateListSimpleNativeDemo = () => {
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
        <List.Item>
          <List.Title>Number 3</List.Title>
          <List.SubTitle>Number 3 have description</List.SubTitle>
        </List.Item>
      </List>
    </YBox>
  );
};
