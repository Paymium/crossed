import { Select, SelectCompact, Text } from '@crossed/ui';
import type { Props } from '../../props';

export const SelectDemo = ({ size, variant, color }: Props) => {
  return (
    <>
      <Select size={size} variant={variant as any} color={color}>
        <Select.Label>Size</Select.Label>
        <Select.Trigger aria-label="Size" />
        <Select.Content>
          <Select.Item value={'xs'} aria-label="xs">
            <Text>xs</Text>
          </Select.Item>
          <Select.Item value={'sm'} aria-label="sm">
            <Text>sm</Text>
          </Select.Item>
          <Select.Item value={'md'} aria-label="md">
            <Text>md</Text>
          </Select.Item>
          <Select.Item value={'lg'} aria-label="lg">
            <Text>lg</Text>
          </Select.Item>
          <Select.Item value={'xl'} aria-label="xl">
            <Text>xl</Text>
          </Select.Item>
        </Select.Content>
      </Select>
      <SelectCompact
        size={size}
        variant={variant as any}
        color={color}
        label={'Size'}
        items={[
          { value: 'xs', label: 'xs' },
          { value: 'sm', label: 'sm' },
          { value: 'md', label: 'md' },
          { value: 'lg', label: 'lg' },
          { value: 'xl', label: 'xl' },
        ]}
      />
    </>
  );
};
