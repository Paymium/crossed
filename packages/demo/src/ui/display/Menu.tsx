import { UilAngleRight, UilSetting } from '@iconscout/react-native-unicons';
import { Menu } from '@crossed/ui';
import type { Props } from '../../props';

export const MenuDemo = ({ color }: Props) => {
  return (
    <Menu color={color}>
      <Menu.Item icon={<UilSetting />} iconAfter={<UilAngleRight />}>
        <Menu.Item.Title>Setting</Menu.Item.Title>
        <Menu.Item.Subtitle>Setting of your account</Menu.Item.Subtitle>
      </Menu.Item>
      <Menu.Item iconAfter={<UilAngleRight />}>
        <Menu.Item.Title>Profile</Menu.Item.Title>
        <Menu.Item.Subtitle>Manage social information</Menu.Item.Subtitle>
      </Menu.Item>
      <Menu.Item iconAfter={<UilAngleRight />}>
        <Menu.Item.Title>Security</Menu.Item.Title>
        <Menu.Item.Subtitle>Modify security account</Menu.Item.Subtitle>
      </Menu.Item>
      <Menu.Item
        title="Users"
        subtitle="List permissions users"
        disabled
        iconAfter={<UilAngleRight />}
      />
      <Menu.Item title="Log out" iconAfter={<UilAngleRight />} />
    </Menu>
  );
};
