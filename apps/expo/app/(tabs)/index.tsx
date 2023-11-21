import { YBox, Heading, Button, Box, Text } from '@crossed/ui';
import { styled } from '@crossed/styled';
import { Text as NText } from 'react-native';

const TextTheme = styled(NText, {
  'className': ['text-black dark:text-white'],
  'variants': {
    color: {
      green: {
        className: ['text-green-500'],
      },
    },
  },
});

export default function TabOneScreen() {
  return (
    <YBox space="lg" className="px-4">
      <Heading order={3}>Heading</Heading>
      <TextTheme color="green">Text</TextTheme>
      <Button variant="outlined" aria-label="Press" color="blue">
        <Button.Text>Press</Button.Text>
      </Button>
      <YBox className="md:flex-row">
        <Box>
          <Text className="text-red-500 dark:text-green-500">Hello</Text>
        </Box>
        <Box>
          <Text>Hello</Text>
        </Box>
      </YBox>
    </YBox>
  );
}
