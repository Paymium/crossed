import { Box, XBox } from '@crossed/ui';
import type { Props } from '../../props';

export const XBoxDemo = ({ space }: Props) => {
  return (
    <XBox space={space}>
      <Box className={'w-20 h-20 bg-blue-300'} />
      <Box className={'w-20 h-20 bg-blue-400'} />
      <Box className={'w-20 h-20 bg-blue-500'} />
    </XBox>
  );
};
