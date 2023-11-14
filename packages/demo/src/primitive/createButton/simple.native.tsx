import { createButton } from '@crossed/primitive';
import { styled } from '@crossed/styled/styled';
import { Box } from '@crossed/ui';
import { Pressable, Text, TextProps } from 'react-native';

const Button = createButton({
  Group: Pressable,
  Root: styled(Pressable, {
    'className': ['flex-row', 'bg-blue-500', 'rounded', 'px-3 py-2', 'gap-2'],
    ':hover': {
      className: ['bg-blue-400'],
    },
  }),
  Text: (props: TextProps) => {
    return <Text {...props} style={[{ color: 'white' }, props.style]} />;
  },
  Icon: (props: TextProps) => {
    return <Text {...props} style={[{ color: 'white' }, props.style]} />;
  },
});

export const CreateButtonNativeDemo = () => {
  return (
    <Box>
      <Button aria-label="Button text">
        <Button.Icon>€</Button.Icon>
        <Button.Text>text button</Button.Text>
      </Button>
    </Box>
  );
};
