import { styled } from '@crossed/styled';
import { TextInput } from 'react-native';

const Input = styled(TextInput, {
  className: [
    'px-3 py-2',
    'border border-neutral-700',
    'bg-neutral-800',
    'rounded-md',
  ],
  props: {
    placeholderTextColor: '$neutral-600',
  },
});

export const PropsPropertyDemo = () => {
  return <Input placeholder="Placeholder" />;
};
