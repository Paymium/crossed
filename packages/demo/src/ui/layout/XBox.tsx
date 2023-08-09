import { Box, XBox } from '@mergeui/ui';

export const XBoxDemo = ({ space }) => {
  return (
    <XBox space={space}>
      <Box className={'w-20 h-20 bg-blue-300'} />
      <Box className={'w-20 h-20 bg-blue-400'} />
      <Box className={'w-20 h-20 bg-blue-500'} />
    </XBox>
  );
};
