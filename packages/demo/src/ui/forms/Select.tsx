import { Select } from '@crossed/ui';
import type { Props } from '../../props';
import { styled } from '@crossed/styled';
import { TextInput } from 'react-native';

const RootFrame = styled(TextInput, {
  // extends: ButtonFrame.styles,
  props: { editable: false },
  className: ['cursor-pointer'],
});

export const SelectDemo = ({ size, variant, color }: Props) => {
  return (
    <Select size={size} variant={variant as any} color={color}>
      <Select.Label />
      <RootFrame />
      <Select.Trigger aria-label="Size" />
      <Select.Content>
        <Select.Item value={'xs'} label="xs" aria-label="xs" />
        <Select.Item value={'sm'} label="sm" aria-label="sm" />
        <Select.Item value={'md'} label="md" aria-label="md" />
        <Select.Item value={'lg'} label="lg" aria-label="lg" />
        <Select.Item value={'xl'} label="xl" aria-label="xl" />
      </Select.Content>
    </Select>
  );
};
