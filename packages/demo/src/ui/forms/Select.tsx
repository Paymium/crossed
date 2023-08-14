import { Select, UilAngleDown } from '@crossed/ui';
import type { Props } from '../../props';

export const SelectDemo = ({ size, variant, color }: Props) => {
  return (
    <Select size={size} variant={variant as any} color={color}>
      <Select.Label>Size</Select.Label>
      <Select.Trigger>
        <Select.Input />
        <Select.Icon>
          <UilAngleDown />
        </Select.Icon>
      </Select.Trigger>
      <Select.Content>
        <Select.Option value={'xs'} label="xs" />
        <Select.Option value={'sm'} label="sm" />
        <Select.Option value={'md'} label="md" />
        <Select.Option value={'lg'} label="lg" />
        <Select.Option value={'xl'} label="xl" />
      </Select.Content>
    </Select>
  );
};
