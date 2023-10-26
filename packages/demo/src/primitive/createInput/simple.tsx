import { createInput } from '@crossed/primitive';
import { styled } from '@crossed/styled/src';
import { Button, YBox } from '@crossed/ui';
import { Pressable, Text, TextInput, View } from 'react-native';

const GroupFrame = styled(Pressable, {
  'className': [
    'bg-neutral-800',
    'border border-neutral-600',
    'flex flex-row',
    'rounded',
    'cursor-text',
    'w-full',
    'items-center',
    'overflow-hidden',
  ],
  ':hover': {
    className: ['border-blue-500'],
  },
  ':active': {
    className: ['border-blue-500'],
  },
  ':focus': {
    className: ['border-blue-500'],
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
  className: ['px-3 py-2', 'cursor-default'],
});

const TextElementFrame = styled(Text, {
  className: ['cursor-default'],
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
          <TextElementFrame>👌</TextElementFrame>
        </Input.Element>
        <Input />
      </Input.Group>
      <Input.Group>
        <Input.Addon>
          <TextElementFrame>👌</TextElementFrame>
        </Input.Addon>
        <Input />
      </Input.Group>
      <Input.Group>
        <Input />
        <Input.Element className="p-0 pr-1">
          <Button
            aria-label="more"
            size="xs"
            variant="filled"
            // eslint-disable-next-line no-console
            onPress={() => console.log('dans la demo')}
          >
            <Button.Text>More</Button.Text>
          </Button>
        </Input.Element>
      </Input.Group>
    </YBox>
  );
};
