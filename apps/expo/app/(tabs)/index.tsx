import { YBox, Heading, Text, Button, Input, Select } from '@crossed/ui';

export default function TabOneScreen() {
  return (
    <YBox space="lg">
      <Heading order={3}>Heading</Heading>
      <Text className="text-white">Text</Text>
      <Button variant={'filled'} color="rose">
        <Button.Text>Press</Button.Text>
      </Button>
      <Input label="Test" />
      <Select>
        <Select.Label>Size</Select.Label>
        <Select.Content>
          <Select.Option value={'xs'}>
            <Text>xs</Text>
          </Select.Option>
          <Select.Option value={'sm'}>
            <Text>sm</Text>
          </Select.Option>
          <Select.Option value={'md'}>
            <Text>md</Text>
          </Select.Option>
          {/* <Select.Option value={'sm'}>sm</Select.Option>
          <Select.Option value={'md'}>md</Select.Option>
          <Select.Option value={'lg'}>lg</Select.Option>
          <Select.Option value={'xl'}>xl</Select.Option> */}
        </Select.Content>
      </Select>
    </YBox>
  );
}
