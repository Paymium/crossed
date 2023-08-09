import { Pressable, Text } from 'react-native';
import { styled, withStaticProperties } from '@mergeui/core';
import type { Props } from '../props';

const [ButtonFrame] = styled(Pressable, {
  base: {
    styles: ['bg-blue-500', 'rounded', 'hover:bg-blue-400'],
    props: {
      role: 'button',
      // dataSet: { test: 'test' },
    },
  },
  variants: {
    size: {
      xs: {
        styles: ['px-1', 'py-0.5'],
        props: { as: 'div' },
      },
      sm: { styles: ['p-2'] },
      md: { styles: ['px-3', 'p-2'] },
      lg: { styles: ['p-4'] },
      xl: { styles: ['p-5'] },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
const [ButtonText] = styled(Text, {
  base: {
    styles: ['text-white'],
    props: { as: 'span' },
  },
  variants: {
    size: {
      xs: { styles: ['text-xs'] },
      sm: { styles: ['text-sm'] },
      md: { styles: ['text-md'] },
      lg: { styles: ['text-lg'] },
      xl: { styles: ['text-xl'] },
    },
  },
});

const Button = withStaticProperties(ButtonFrame, { Text: ButtonText });

export const StyledDemo = ({ space }: Props) => {
  return (
    <Button size={space}>
      <Button.Text size={space}>Hello</Button.Text>
    </Button>
  );
};
