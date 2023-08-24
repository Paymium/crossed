import { YBox, Heading, Text, Button } from '@crossed/ui';

export default function TabOneScreen() {
  return (
    <YBox space="lg">
      <Heading order={3}>Heading</Heading>
      <Text className="text-white">Text</Text>
      <Button variant={'filled'}>
        <Button.Text>Press</Button.Text>
      </Button>
      {/* <Input label="Test" /> */}
    </YBox>
  );
}
