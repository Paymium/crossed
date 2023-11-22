import { createLabel } from '@crossed/primitive';
import { styled } from '@crossed/styled';
import { YBox } from '@crossed/ui';
import { Text, TextInput, View } from 'react-native';

const Input = styled(TextInput, {
  'className': [
    'bg-neutral-800',
    'border border-neutral-600',
    'flex flex-1',
    'rounded',
    'cursor-text',
    'w-full',
    'px-3 py-2',
  ],
  ':focus': {
    className: ['border-blue-600'],
  },
  ':hover': {
    className: ['border-blue-600'],
  },
});

const TextLabel = styled(Text, {
  className: [],
  props: { as: 'label' },
});

const Label = createLabel({
  Root: View,
  Text: TextLabel,
});

export const CreateLabelSimpleNativeDemo = () => {
  return (
    <YBox space="md">
      <Label>
        <Label.Text aria-label="Input">Input</Label.Text>
        <Label.Input>
          <Input placeholder="toto" />
        </Label.Input>
      </Label>
    </YBox>
  );
};
