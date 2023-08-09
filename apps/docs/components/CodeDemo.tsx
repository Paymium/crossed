import { UilCheck } from '@iconscout/react-native-unicons';
import { Props } from '@mergeui/demo/lib/typescript/props';
import {
  Box,
  Button,
  Label,
  Select,
  Text,
  XBox,
  YBox,
  colorVariants,
} from '@mergeui/ui';
import { useData } from 'nextra/data';
import { useState, ComponentType } from 'react';
import { CopyBlock, dracula } from 'react-code-blocks';

const DefaultDemo = () => {
  return <Text>No demo</Text>;
};
export const CodeDemo = ({
  Demo = DefaultDemo,
  actions = {},
}: {
  Demo?: ComponentType<Props>;
  actions?: {
    size?: boolean;
    space?: boolean;
    color?: boolean;
    variant?: string[];
  };
}) => {
  const { code } = useData() || { code: '' };
  const [show, setShow] = useState(false);
  const [color, setColor] = useState('zinc');
  const [space, setSpace] = useState('md');
  const [size, setSize] = useState('md');
  const [variant, setVariant] = useState(actions.variant?.[0] || '');
  const hasActions = Object.keys(actions || {}).length > 0;

  return (
    <Box className="border-zinc-800 border-2 rounded-md">
      <Box className="flex-row flex">
        <Box className="flex-1 p-4 justify-center items-center">
          <Demo color={color} space={space} size={size} variant={variant} />
        </Box>
        <YBox
          className={`${
            hasActions ? 'border-l-2 p-4' : ''
          } border-zinc-800 relative pb-8 max-w-[26%]`}
          space="sm"
        >
          {hasActions && (
            <>
              {actions.variant && (
                <Select value={variant} onChangeValue={setVariant}>
                  <Select.Label>Variant</Select.Label>
                  <Select.Content>
                    {actions.variant.map((v) => {
                      return (
                        <Select.Option value={v} key={v}>
                          {v}
                        </Select.Option>
                      );
                    })}
                  </Select.Content>
                </Select>
              )}
              {actions.space && (
                <Select value={space} onChangeValue={setSpace}>
                  <Select.Label>Space</Select.Label>
                  <Select.Content>
                    <Select.Option value={undefined}>undefined</Select.Option>
                    <Select.Option value="xs">xs</Select.Option>
                    <Select.Option value="sm">sm</Select.Option>
                    <Select.Option value="md">md</Select.Option>
                    <Select.Option value="lg">lg</Select.Option>
                    <Select.Option value="xl">xl</Select.Option>
                  </Select.Content>
                </Select>
              )}
              {actions.size && (
                <Select value={size} onChangeValue={setSize}>
                  <Select.Label>Size</Select.Label>
                  <Select.Content>
                    <Select.Option value="xs">xs</Select.Option>
                    <Select.Option value="sm">sm</Select.Option>
                    <Select.Option value="md">md</Select.Option>
                    <Select.Option value="lg">lg</Select.Option>
                    <Select.Option value="xl">xl</Select.Option>
                  </Select.Content>
                </Select>
              )}
              {actions.color && (
                <Label>
                  <Label.Text>Color ({color})</Label.Text>
                  <Label.Input>
                    <XBox space="xs" className="flex-wrap">
                      {(
                        Object.keys(
                          colorVariants
                        ) as (keyof typeof colorVariants)[]
                      ).map((c) => {
                        return (
                          <Button
                            variant="filled"
                            size="xs"
                            key={c}
                            className="w-5 h-5"
                            color={c}
                            onPress={() => setColor(c)}
                          >
                            {c === color && (
                              <Button.Icon className="absolute inset-0 justify-center items-center">
                                <UilCheck />
                              </Button.Icon>
                            )}
                          </Button>
                        );
                      })}
                    </XBox>
                  </Label.Input>
                </Label>
              )}
            </>
          )}
          {code.length > 0 && (
            <Button
              color="violet"
              variant="filled"
              onPress={() => setShow((e) => !e)}
              className="absolute bottom-0 right-0"
              size="xs"
            >
              <Button.Text>{show ? 'Hide' : 'Show'}</Button.Text>
            </Button>
          )}
        </YBox>
      </Box>
      {show && (
        <Box className="text-md">
          <CopyBlock
            // @ts-ignore
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
