import { Box, YBox } from '@crossed/ui';
import type { Props } from '../../props';

export const YBoxDemo = ({ space }: Props) => {
  return (
    <YBox space={space}>
      <Box className={'w-20 h-20 bg-blue-300'} />
      <Box className={'w-20 h-20 bg-blue-400'} />
      <Box className={'w-20 h-20 bg-blue-500'} />
    </YBox>
  );
};
