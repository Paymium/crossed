import { createInput } from '@crossed/primitive';
import { styled } from '@crossed/styled/src';
import { Button, YBox } from '@crossed/ui';
import { Text, TextInput, View } from 'react-native';

const GroupFrame = styled(View, {
  'className': [
    'bg-neutral-800',
    'border border-neutral-600',
    'flex flex-row',
    'rounded',
    'cursor-text',
    'w-full',
  ],
  ':hover': {
    className: ['border-blue-500'],
  },
  ':active': {
    className: ['border-blue-500'],
  },
  ':focus': {
    className: ['ring ring-blue-500'],
  },
});
const InputFrame = styled(TextInput, {
  className: [
    'w-0 flex-1',
    'appearance-none',
    'bg-transparent',
    'outline-0',
    '!shadow-none',
    'ring-0',
    'ring-offset-transparent',
    'px-3 py-2',
  ],
});
const AddonFrame = styled(View, {
  className: ['bg-neutral-700', 'px-3 py-2'],
});
const ElementFrame = styled(View, {
  className: ['px-3 py-2'],
});

const Input = createInput({
  Group: GroupFrame,
  Addon: AddonFrame,
  Element: ElementFrame,
  Input: InputFrame,
});

export const CreateInputSimpleDemo = () => {
  return (
    <YBox space="md" className="w-1/2">
      {/* <Input /> */}
      <Input.Group>
        <Input.Element>
          <Text>👌</Text>
        </Input.Element>
        <Input />
      </Input.Group>
      <Input.Group>
        <Input.Addon>
          <Text>👌</Text>
        </Input.Addon>
        <Input />
      </Input.Group>
      <Input.Group>
        <Input />
        <Input.Element>
          <Button aria-label="more" onPress={() => console.log('dans la demo')}>
            <Button.Text>More</Button.Text>
          </Button>
        </Input.Element>
      </Input.Group>
    </YBox>
  );
};
