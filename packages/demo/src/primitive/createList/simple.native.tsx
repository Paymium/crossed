import { createList } from '@crossed/primitive';
import { YBox } from '@crossed/ui';
import { Text, TextProps, View, ViewProps } from 'react-native';

const List = createList({
  Root: (props: ViewProps) => {
    return (
      <View
        {...props}
        style={[
          {
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 5,
          },
          props.style,
        ]}
      />
    );
  },
  Item: (props: ViewProps) => {
    return (
      <View
        {...props}
        style={[
          {
            paddingVertical: 8,
            paddingHorizontal: 12,
          },
          props.style,
        ]}
      />
    );
  },
  SubTitle: (props: TextProps) => {
    return <Text {...props} style={[{ color: 'gray' }, props.style]} />;
  },
  Title: (props: TextProps) => {
    return (
      <Text
        {...props}
        style={[{ color: 'white', fontWeight: '700' }, props.style]}
      />
    );
  },
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
