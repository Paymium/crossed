import { Box, YBox } from '@mergeui/ui';

export const YBoxDemo = ({ space }) => {
  return (
    <YBox space={space}>
      <Box className={'w-20 h-20 bg-blue-300'} />
      <Box className={'w-20 h-20 bg-blue-400'} />
      <Box className={'w-20 h-20 bg-blue-500'} />
    </YBox>
  );
};
