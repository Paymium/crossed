import { Select } from '@mergeui/ui';

export const SelectDemo = ({ size, color }) => {
  return (
    <Select color={color} size={size}>
      <Select.Option value={"xs"}>xs</Select.Option>
      <Select.Option value={"sm"}>sm</Select.Option>
      <Select.Option value={"md"}>md</Select.Option>
      <Select.Option value={"lg"}>lg</Select.Option>
      <Select.Option value={"xl"}>xl</Select.Option>
    </Select>
  );
};
