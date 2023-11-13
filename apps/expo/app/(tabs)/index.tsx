import { YBox, Heading, Button } from '@crossed/ui';
import { styled } from '@crossed/styled';
import { Text as NText } from 'react-native';

const TextTheme = styled(NText, {
  'className': ['text-red-500'],
  ':dark': {
    className: ['text-white'],
  },
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
    </YBox>
  );
}
