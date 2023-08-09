import { Select } from '@mergeui/ui';
import type { Props } from '../props';

export const SelectDemo = ({ size }: Props) => {
  return (
    <Select size={size}>
      <Select.Label>Size</Select.Label>
      <Select.Content>
        <Select.Option value={'xs'}>xs</Select.Option>
        <Select.Option value={'sm'}>sm</Select.Option>
        <Select.Option value={'md'}>md</Select.Option>
        <Select.Option value={'lg'}>lg</Select.Option>
        <Select.Option value={'xl'}>xl</Select.Option>
      </Select.Content>
    </Select>
  );
};
