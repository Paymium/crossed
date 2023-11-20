import { createButton } from '@crossed/primitive';
import { styled } from '@crossed/styled';
import { Box } from '@crossed/ui';
import { Pressable, Text, TextProps, View } from 'react-native';

const Button = createButton({
  Group: View,
  Root: styled(Pressable, {
    'className': [
      'flex flex-row items-center',
      'bg-blue-500',
      'rounded',
      'px-3 py-2',
      'gap-2',
    ],
    ':hover': { className: ['bg-blue-400'] },
  }),
  Text: styled(Text, { className: ['text-base text-white'] }),
  Element: (props: TextProps) => {
    return <Text {...props} style={[{ color: 'white' }, props.style]} />;
  },
});

export const CreateButtonNativeDemo = () => {
  return (
    <Box>
      <Button aria-label="Button text">
        <Button.Element>€</Button.Element>
        <Button.Text>text button</Button.Text>
      </Button>
    </Box>
  );
};
