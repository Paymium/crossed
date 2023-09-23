import { UilAngleRight, UilSetting } from '@iconscout/react-native-unicons';
import { List } from '@crossed/ui';
import type { Props } from '../../props';

const ListDemo = ({ color, size }: Props) => {
  return (
    <List color={color} size={size}>
      <List.Item icon={<UilSetting />} iconAfter={<UilAngleRight />} pressable>
        <List.Title>Setting</List.Title>
        <List.SubTitle>Setting of your account</List.SubTitle>
      </List.Item>
      <List.Item iconAfter={<UilAngleRight />} pressable>
        <List.Title>Profile</List.Title>
        <List.SubTitle>Manage social information</List.SubTitle>
      </List.Item>
      <List.Item iconAfter={<UilAngleRight />} pressable>
        <List.Title>Security</List.Title>
        <List.SubTitle>Modify security account</List.SubTitle>
      </List.Item>
      <List.Item
        title="Users"
        subtitle="List permissions users"
        disabled
        iconAfter={<UilAngleRight />}
        pressable
      />
      <List.Item title="Log out" iconAfter={<UilAngleRight />} pressable />
    </List>
  );
};

ListDemo.displayName = 'ListDemo';

export { ListDemo };
