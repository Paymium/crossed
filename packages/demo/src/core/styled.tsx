import { Pressable, Text } from 'react-native';
import { styled, withStaticProperties } from '@crossed/core';
import type { Props } from '../props';
import { YBox } from '@crossed/ui';

const ButtonFrame = styled(Pressable, {
  'className': ['bg-blue-500', 'rounded', 'transition-[bg]'],
  ':hover': {
    animate: ['bg-blue-400'],
  },
  ':active': {
    className: ['bg-blue-600'],
  },
  ':disabled': {
    className: ['opacity-50', 'pointer-events-none'],
  },
  'props': {
    role: 'button',
  },
  'variants': {
    size: {
      xs: {
        className: ['px-1', 'py-0.5'],
        props: { as: 'div' },
      },
      sm: { className: ['p-2'] },
      md: { className: ['px-3', 'p-2'] },
      lg: { className: ['p-4'] },
      xl: { className: ['p-5'] },
    },
  },
  'defaultVariants': {
    size: 'md',
  },
});
const ButtonText = styled(Text, {
  className: ['text-white'],
  props: { as: 'span' },
  variants: {
    size: {
      xs: { className: ['text-xs'] },
      sm: { className: ['text-sm'] },
      md: { className: ['text-md'] },
      lg: { className: ['text-lg'] },
      xl: { className: ['text-xl'] },
    },
  },
});

const Button = withStaticProperties(ButtonFrame, { Text: ButtonText });

export const StyledDemo = ({ space }: Props) => {
  return (
    <YBox space="md">
      <Button size={space}>
        <Button.Text size={space}>Hello</Button.Text>
      </Button>

      <Button size={space} disabled>
        <Button.Text size={space}>Disabled</Button.Text>
      </Button>
    </YBox>
  );
};
