import { UilCheck, UilEye, UilEyeSlash } from '@iconscout/react-native-unicons';
import type { Props } from '@crossed/demo';
import {
  Box,
  Button,
  Label,
  SelectCompact as Select,
  Text,
  XBox,
  YBox,
  colorVariants,
} from '@crossed/ui';
import { useData } from 'nextra/data';
import { useState, ComponentType, useRef } from 'react';
import { CopyBlock, dracula } from 'react-code-blocks';
import { styled } from '@crossed/styled';

const Eye = styled(UilEye, {
  props: {
    color: '$neutral-500',
  },
}) as any;
const EyeSlash = styled(UilEyeSlash, {
  props: {
    color: '$neutral-500',
  },
}) as any;

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
    <Box className="border rounded-md flex-col overflow-hidden border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
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
          } relative pb-8 max-w-[26%] dark:border-neutral-800 border-neutral-200`}
          space="sm"
        >
          {hasActions && (
            <>
              {actions.variant && (
                <Select
                  value={variant as any}
                  onChange={setVariant}
                  label="Variant"
                  items={actions.variant.map((v) => ({ value: v, label: v }))}
                />
              )}
              {actions.space && (
                <Select
                  value={space as any}
                  onChange={setSpace}
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
                  value={size as any}
                  onChange={setSize}
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
                  <Label.Text>Color (${color})</Label.Text>
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
                              <Button.Element className="absolute inset-0 justify-center items-center">
                                <UilCheck />
                              </Button.Element>
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
              >
                <Button.Element>
                  {!show ? <Eye /> : <EyeSlash />}
                </Button.Element>
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
