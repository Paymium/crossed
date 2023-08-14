import { UilCheck } from '@iconscout/react-native-unicons';
import { Props } from '@crossed/demo/lib/typescript/props';
import {
  Animate,
  Box,
  Button,
  Label,
  Select,
  Text,
  XBox,
  YBox,
  colorVariants,
} from '@crossed/ui';
import { useData } from 'nextra/data';
import { useState, ComponentType, useRef } from 'react';
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
    <Box className="dark:border-zinc-800 border-zinc-200 border-2 rounded-md">
      <Box className="flex-row flex">
        <Box className="flex-1 p-4 justify-center items-center">
          <Demo color={color} space={space} size={size} variant={variant} />
        </Box>
        <YBox
          className={`${
            hasActions ? 'border-l-2 p-4' : ''
          } dark:border-zinc-800 border-zinc-200 relative pb-8 max-w-[26%]`}
          space="sm"
        >
          {hasActions && (
            <>
              {actions.variant && (
                <Select
                  value={variant}
                  onChangeValue={setVariant}
                  label="Variant"
                  items={actions.variant.map((v) => ({ value: v, label: v }))}
                />
              )}
              {actions.space && (
                <Select
                  value={space}
                  onChangeValue={setSpace}
                  label="Space"
                  items={[
                    { value: 'xs', label: 'xs' },
                    { value: 'sm', label: 'sm' },
                    { value: 'md', label: 'md' },
                    { value: 'lg', label: 'lg' },
                    { value: 'xl', label: 'xl' },
                  ]}
                />
              )}
              {actions.size && (
                <Select
                  value={size}
                  onChangeValue={setSize}
                  label="Size"
                  items={[
                    { value: 'xs', label: 'xs' },
                    { value: 'sm', label: 'sm' },
                    { value: 'md', label: 'md' },
                    { value: 'lg', label: 'lg' },
                    { value: 'xl', label: 'xl' },
                  ]}
                />
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
            <Box className="absolute bottom-0 right-0">
              <Button
                color="violet"
                variant="filled"
                onPress={() => setShow((e) => !e)}
                size="xs"
              >
                <Button.Text>{show ? 'Hide' : 'Show'}</Button.Text>
              </Button>
            </Box>
          )}
        </YBox>
      </Box>
      <Code show={show} code={code} />
    </Box>
  );
};

const Code = ({ show, code }: { show: boolean; code: string }) => {
  const heightRef = useRef<number>(500);
  return (
    <Animate
      from={{
        height: 0,
      }}
      animate={{ height: show ? heightRef.current : 0 }}
      className="overflow-hidden"
    >
      <Box
        className="text-md"
        onLayout={({ nativeEvent: { layout } }) => {
          heightRef.current = layout.height;
        }}
      >
        <CopyBlock
          // @ts-ignore
          text={code}
          language={'tsx'}
          theme={dracula}
          showLineNumbers
          wrapLines
        />
      </Box>
    </Animate>
  );
};
