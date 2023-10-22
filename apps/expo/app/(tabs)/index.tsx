import { YBox, Heading, Text, Button } from '@crossed/ui';

export default function TabOneScreen() {
  return (
    <YBox space="lg" className="px-4">
      <Heading order={3}>Heading</Heading>
      <Text className="text-white">Text</Text>
      <Button
        variant={'outlined'}
        aria-label="Press"
        color="blue"
        // className="bg-red-500"
        // style={{ backgroundColor: 'blue' }}
      >
        <Button.Text>Press</Button.Text>
      </Button>
      {/* <Input label="Test" /> */}
    </YBox>
  );
}
