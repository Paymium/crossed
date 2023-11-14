import { tw } from '@crossed/styled';
import { styled } from '@crossed/styled/styled';
import { Pressable, Text, TextInput } from 'react-native';

const ButtonText = styled(Text, {
  className: ['text-white', 'text-center'],
});
const Button = styled(Pressable, {
  'className': ['px-3 py-2', 'border border-neutral-700', 'bg-neutral-800'],
  'props': {
    role: 'button',
  },
  ':hover': {
    className: ['bg-neutral-700'],
  },
  ':active': {
    className: ['bg-neutral-900'],
  },
});

const InputStyledFrom = styled(TextInput, {
  extends: Button.styles,
  className: ['text-left'],
  props: {
    placeholderTextColor: tw.color('neutral-500'),
  },
});

export const ButtonExtendsNativeDemo = () => {
  return (
    <div className="flex flex-col gap-5 justify-center p-5">
      <Button>
        <ButtonText>Hover or Press</ButtonText>
      </Button>
      <InputStyledFrom placeholder="Placeholder" />
    </div>
  );
};
