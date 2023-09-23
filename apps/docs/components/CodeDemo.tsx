import { UilCheck, UilEye, UilEyeSlash } from '@iconscout/react-native-unicons';
import { Props } from '@crossed/demo/lib/typescript/props';
import {
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
  name = 'code',
}: {
  Demo?: ComponentType<Props>;
  actions?: {
    size?: boolean;
    space?: boolean;
    color?: boolean;
    variant?: string[];
  };
  name?: string;
}) => {
  const code = (useData() || { [name]: '' })[name] || '';
  const [show, setShow] = useState(false);
  const [color, setColor] = useState('neutral');
  const [space, setSpace] = useState('md');
  const [size, setSize] = useState('md');
  const [variant, setVariant] = useState(actions.variant?.[0] || '');
  const hasActions = Object.keys(actions || {}).length > 0;

  return (
    <Box
      $dark={{ className: ['border-neutral-800 bg-neutral-900'] }}
      $light={{ className: ['border-neutral-200 bg-neutral-100'] }}
      className="border rounded-md flex-col overflow-hidde"
    >
      <Box className="flex-row flex">
        <Box className="flex-1 p-4 justify-center items-center">
          <Demo
            color={color as any}
            space={space as any}
            size={size as any}
            variant={variant}
            weight=""
          />
        </Box>
        <YBox
          className={`${
            hasActions ? 'border-l p-4' : 'w-0'
          } relative pb-8 max-w-[26%]`}
          $dark={{ className: ['border-neutral-800'] }}
          $light={{ className: ['border-neutral-200'] }}
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
                            aria-label={`Color ${c}`}
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
                className="relative"
                aria-label="Show code"
                onPress={() => setShow((e) => !e)}
                size="xs"
                variant="unstyled"
              >
                <Button.Icon>
                  {!show ? <UilEye /> : <UilEyeSlash />}
                </Button.Icon>
              </Button>
            </Box>
          )}
        </YBox>
      </Box>
      <Code show={show} name={name} />
    </Box>
  );
};

export const Code = ({ show, name }: { show: boolean; name: string }) => {
  const heightRef = useRef(500);
  const code = (useData() || { [name]: '' })[name] || '';
  return show && code ? (
    <Box
      className="text-[13px] block"
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
  ) : null;
};
