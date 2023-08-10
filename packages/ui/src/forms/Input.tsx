import {
  createScope,
  merge,
  styled,
  withStaticProperties,
} from '@mergeui/core';
import {
  cloneElement,
  forwardRef,
  type ComponentType,
  type PropsWithChildren,
  type ReactElement,
} from 'react';
import { Label } from './Label';
import { colorVariants, sizeVariants, spaceVariants } from '../variants';
import type { GetProps } from '../types';
import { Pressable, TextInput, View } from 'react-native';
import tw from 'twrnc';

const [Provider, useContext] = createScope<{
  size?: keyof typeof sizeVariants | null;
  color?: keyof typeof colorVariants | null;
  variant?: 'filled' | 'outlined' | null;
  value?: string;
  onChangeValue?: (e: string) => void;
}>({
  size: 'md',
  color: 'zinc',
  variant: 'outlined',
});

const [InputContentFrame] = styled(View, {
  base: {
    styles: [
      'flex flex-row',
      'rounded-md',
      'appearance-none',
      'border-2',
      'focus:ring-2',
      'focus-within:ring-2',
      'focus-visible:ring-2',
    ],
  },
  variants: {
    size: sizeVariants,
    color: colorVariants,
    variant: {
      filled: { styles: ['border-transparent'] },
      outlined: {
        styles: ['bg-zinc-950', 'hover:bg-zinc-900', 'active:bg-zinc-900'],
      },
    },
    space: spaceVariants,
  },
  defaultVariants: {
    size: 'md',
    color: 'zinc',
    variant: 'outlined',
  },
});

const [InputInputFrame, InputInputFrameStyles] = styled(TextInput, {
  base: {
    styles: [
      'appearance-none',
      'focus-visible:!ring-offset-transparent focus-visible:!ring-transparent focus-visible:shadow-none',
      'text-white',
      'group-focus',
      'flex-1',
      'focus-visible:outline-0',
    ],
  },
});

const [InputIconFrame] = styled(Pressable, {
  base: {
    styles: [],
  },
});

export type InputRootProps = PropsWithChildren<
  Omit<GetProps<typeof Provider>, 'as' | 'className' | 'children'> & {
    value?: string;
    onChangeValue?: (value: string) => void;
    label?: string;
    icon?: ComponentType;
    iconAfter?: ComponentType;
  }
>;

function InputRoot(props: Omit<InputRootProps, 'children'>): ReactElement;
function InputRoot(
  props: Omit<InputRootProps, 'label' | 'iconAfter' | 'icon'>
): ReactElement;
function InputRoot({
  children,
  label,
  iconAfter: IconAfter,
  icon: Icon,
  size,
  color,
  variant,
  value,
  onChangeValue,
}: InputRootProps) {
  return (
    <Provider
      size={size}
      color={color}
      variant={variant}
      value={value}
      onChangeValue={onChangeValue}
    >
      <Label className="group">
        {children ??
          [
            label && <InputLabel key="InputLabel">{label}</InputLabel>,
            <InputContent key="InputContent">
              {Icon && (
                <InputIcon key="InputIconLeft">
                  <Icon />
                </InputIcon>
              )}
              <InputInput key="InputInput" />
              {IconAfter && (
                <InputIcon key="InputIconRight">
                  <IconAfter />
                </InputIcon>
              )}
            </InputContent>,
          ].filter(Boolean)}
      </Label>
    </Provider>
  );
}
const InputLabel = Label.Text;
const InputInput = forwardRef<
  any,
  Omit<GetProps<typeof InputInputFrame>, 'value'>
>((props, ref) => {
  const { value, onChangeValue } = useContext();
  return (
    <Label.Input>
      <InputInputFrame
        {...props}
        value={value}
        onChangeText={onChangeValue}
        ref={ref}
      />
    </Label.Input>
  );
});
const InputIcon = ({
  children,
  ...props
}: PropsWithChildren<GetProps<typeof InputIconFrame>>) => {
  const className = merge(InputInputFrameStyles());
  const style = tw.style(className);
  return (
    <InputIconFrame {...props}>
      {cloneElement(children as any, {
        size: Number(style.fontSize) * 1.2 || 16,
        color: style.color,
      })}
    </InputIconFrame>
  );
  // return <InputIconFrame {...props}>{children}</InputIconFrame>;
};
const InputContent = ({
  children,
  ...props
}: PropsWithChildren<GetProps<typeof InputContentFrame>>) => {
  const { color, size, variant } = useContext();
  return (
    <InputContentFrame
      color={color}
      size={size}
      variant={variant}
      space={'xs'}
      {...props}
    >
      {children}
    </InputContentFrame>
  );
};

export const Input = withStaticProperties(InputRoot, {
  Label: InputLabel,
  Input: InputInput,
  Icon: InputIcon,
  Content: InputContent,
});
