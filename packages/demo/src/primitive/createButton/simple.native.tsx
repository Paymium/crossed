import { createButton } from '@crossed/primitive';
import { Box } from '@crossed/ui';
import { Pressable, PressableProps, Text, TextProps } from 'react-native';

const Button = createButton({
  Group: Pressable,
  Root: (props: PressableProps) => {
    return (
      <Pressable
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'blue',
          paddingHorizontal: 12,
          paddingVertical: 8,
          gap: 8,
        }}
        {...props}
      />
    );
  },
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
