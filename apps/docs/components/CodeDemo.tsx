import { Box, Button } from '@mergeui/ui';
import { useData } from 'nextra/data';
import { useState } from 'react';
import { CopyBlock, dracula } from 'react-code-blocks';

export const CodeDemo = ({ Demo }) => {
  const { code } = useData();
  const [show, setShow] = useState(false);
  const [color, setColor] = useState('zinc');
  return (
    <Box className="border-zinc-800 border-2 rounded-md">
      <Box className="flex-row flex">
        <Box className="flex-1 p-4 content-center items-center">
          <Demo color={color} />
        </Box>
        <Box className="border-l-2 border-zinc-800 p-4 relative">
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
        </Box>
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
