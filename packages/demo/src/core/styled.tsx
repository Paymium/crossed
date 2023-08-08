import { Pressable, Text } from 'react-native';
import { styled, withStaticProperties } from '@mergeui/core';

const ButtonFrame = styled(Pressable, {
  base: {
    styles: ["bg-blue-500", "rounded", 'hover:bg-blue-400'],
    props: {
      role: "button",
      // dataSet: { test: 'test' },
    },
  },
  variants: {
    size: {
      xs: ['px-1', "py-0.5"],
      sm: ['p-2'],
      md: ['px-3', 'p-2'],
      lg: ['p-4'],
      xl: ['p-5']
    }
  },
  defaultVariants: {
    size: "md",
  }
});
const ButtonText = styled(Text, {
  base: {
    styles: ["text-white"],
    props: {as: 'span',}
  }
});

const Button = withStaticProperties(ButtonFrame, { Text: ButtonText });

export const StyledDemo = () => {
  return (
    <Button>
      <Button.Text>Hello</Button.Text>
    </Button>
  );
}
