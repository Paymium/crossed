import type { GetProps } from '@crossed/styled';
import { styled } from '@crossed/styled';
import { Pressable, Text } from 'react-native';

const Button = styled(Pressable, {
  className: [
    'px-3 py-2',
    'border border-neutral-700',
    'bg-neutral-800',
    'rounded-md',
  ],
  props: {
    role: 'button',
  },
});

type ButtonProps = GetProps<typeof Button>;

export const ButtonOnlyBaseNativeDemo = (props: ButtonProps) => {
  return (
    <Button {...props}>
      <Text>Hello world</Text>
    </Button>
  );
};
