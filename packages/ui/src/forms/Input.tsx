import {
  createScope,
  merge,
  styled,
  withStaticProperties,
  tw,
} from '@mergeui/core';
import {
  cloneElement,
  forwardRef,
  type ComponentType,
  type PropsWithChildren,
  type ReactElement,
  useState,
  useMemo,
  memo,
  Dispatch,
  SetStateAction,
} from 'react';
import { Label } from './Label';
import { colorVariants, sizeVariants, spaceVariants } from '../variants';
import type { GetProps } from '../types';
import { Pressable, TextInput, View } from 'react-native';

const [Provider, useContext] = createScope<{
  size?: keyof typeof sizeVariants;
  color?: keyof typeof colorVariants;
  variant?: 'filled' | 'outlined';
  value?: string;
  onChangeValue?: (e: string) => void;
  focus?: boolean;
  setFocus: Dispatch<SetStateAction<boolean>>;
}>({
  size: 'md',
  color: 'zinc',
  variant: 'outlined',
  setFocus: () => {},
});

const [InputContentFrame] = styled(View, {
  'className': ['flex flex-row', 'rounded-md', 'appearance-none', 'border-2'],
  ':focus': {
    className: ['ring-2'],
  },
  'variants': {
    size: sizeVariants,
    color: colorVariants,
    variant: {
      filled: { className: ['border-transparent'] },
      outlined: {
        className: ['bg-zinc-950'],
      },
    },
    space: spaceVariants,
  },
  'defaultVariants': {
    size: 'md',
    color: 'zinc',
    variant: 'outlined',
  },
  'compoundVariants': [
    {
      'color': Object.keys(colorVariants) as (keyof typeof colorVariants)[],
      'variant': 'outlined',
      ':hover': {
        className: ['bg-zinc-900'],
      },
      ':focus': {
        className: ['bg-zinc-900'],
      },
    },
  ],
});

const [InputInputFrame, InputInputFrameStyles] = styled(TextInput, {
  className: [
    'appearance-none',
    'focus-visible:!ring-offset-transparent focus-visible:!ring-transparent focus-visible:shadow-none',
    'text-white',
    'group-focus',
    'flex-1',
    'focus-visible:outline-0',
  ],
});

const [InputIconFrame] = styled(Pressable, {
  className: [],
});

export type InputRootProps = PropsWithChildren<
  Omit<
    GetProps<typeof Provider>,
    'as' | 'className' | 'children' | 'focus' | 'setFocus'
  > & {
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
  const [focus, setFocus] = useState(false);
  return (
    <Provider
      size={size}
      color={color}
      variant={variant}
      value={value}
      onChangeValue={onChangeValue}
      focus={focus}
      setFocus={setFocus}
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
const InputInput = memo(
  forwardRef<any, Omit<GetProps<typeof InputInputFrame>, 'value'>>(
    (props, ref) => {
      const { value, onChangeValue, setFocus } = useContext();

      return useMemo(
        () => (
          <Label.Input>
            <InputInputFrame
              {...props}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              value={value}
              onChangeText={onChangeValue}
              ref={ref}
            />
          </Label.Input>
        ),
        [props, value]
      );
    }
  )
);
const InputIcon = memo(
  ({
    children,
    ...props
  }: PropsWithChildren<GetProps<typeof InputIconFrame>>) => {
    const className = merge(InputInputFrameStyles());
    const style = tw.style(className);
    return useMemo(
      () => (
        <InputIconFrame {...props}>
          {cloneElement(children as any, {
            size: Number(style.fontSize) * 1.2 || 16,
            color: style.color,
          })}
        </InputIconFrame>
      ),
      [style.fontSize, style.color]
    );
  }
);
const InputContent = ({
  children,
  ...props
}: PropsWithChildren<GetProps<typeof InputContentFrame>>) => {
  const { color, size, variant, focus } = useContext();
  return (
    <InputContentFrame
      color={color}
      size={size}
      variant={variant}
      space={'xs'}
      states={{ isFocus: focus }}
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
