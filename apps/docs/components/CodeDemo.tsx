import { Box, Button, Select, YBox } from '@mergeui/ui';
import { useData } from 'nextra/data';
import { useState } from 'react';
import { CopyBlock, dracula } from 'react-code-blocks';

const DefaultDemo = (p: any) => {
  return 'No demo';
};
export const CodeDemo = ({ Demo = DefaultDemo }) => {
  const { code } = useData() || { code: '' };
  const [show, setShow] = useState(false);
  const [color, setColor] = useState('zinc');
  const [space, setSpace] = useState("md");
  return (
    <Box className="border-zinc-800 border-2 rounded-md">
      <Box className="flex-row flex">
        <Box className="flex-1 p-4 content-center items-center">
          <Demo color={color} space={space} />
        </Box>
        <YBox className="border-l-2 border-zinc-800 p-4 relative" space="sm">
          <Select onChange={(e)=> setSpace(e.target.value)} value={space}>
            <Select.Option value={undefined}>undefined</Select.Option>
            <Select.Option value="xs">xs</Select.Option>
            <Select.Option value="sm">sm</Select.Option>
            <Select.Option value="md">md</Select.Option>
            <Select.Option value="lg">lg</Select.Option>
            <Select.Option value="xl">xl</Select.Option>
          </Select>
          <Box className="flex-row gap-1">
            <Button
              className="w-5 h-5"
              color="zinc"
              onPress={() => setColor('zinc')}
            />
            <Button
              className="w-5 h-5"
              color="red"
              onPress={() => setColor('red')}
            />
            <Button
              className="w-5 h-5"
              color="green"
              onPress={() => setColor('green')}
            />
            <Button
              className="w-5 h-5"
              color="blue"
              onPress={() => setColor('blue')}
            />
          </Box>
          <Button
            onPress={() => setShow((e) => !e)}
            className="absolute bottom-0 right-0"
            size="xs"
          >
            <Button.Text>{show ? 'Hide' : 'Show'}</Button.Text>
          </Button>
        </YBox>
      </Box>
      {show && (
        <Box className="text-md">
          <CopyBlock
            text={code}
            language={'tsx'}
            theme={dracula}
            showLineNumbers
            wrapLines
          />
        </Box>
      )}
    </Box>
  );
};
