import { YBox, Divider, XBox, Text } from '@mergeui/ui';
import type { Props } from '../../props';

export const DividerDemo = ({ space }: Props) => {
  return (
    <YBox space={space}>
      <XBox space={space}>
        <Text>Hello</Text>
        <Divider direction="vertical" />
        <Text>World</Text>
      </XBox>
      <Divider direction="horizontal" />
      <Text className='self-center'>Hello</Text>
    </YBox>
  );
};
