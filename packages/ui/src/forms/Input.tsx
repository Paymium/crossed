import {
  createScope,
  styled,
  withStaticProperties,
  tw,
  GetProps,
} from '@crossed/core';
import {
  cloneElement,
  forwardRef,
  type ComponentType,
  type PropsWithChildren,
  useState,
  useMemo,
  memo,
  Dispatch,
  SetStateAction,
} from 'react';
import { Label } from './Label';
import { colorVariants, sizeVariants, spaceVariants } from '../variants';
import { Pressable, TextInput } from 'react-native';

const [Provider, useContext] = createScope<{
  size?: keyof typeof sizeVariants;
  color?: keyof typeof colorVariants;
  variant?: 'filled' | 'outlined';
  value?: string;
  onChangeValue?: (e: string) => void;
  focus?: boolean;
  setFocus: Dispatch<SetStateAction<boolean>>;
  refInput?: any;
}>({
  size: 'md',
  color: 'zinc',
  variant: 'outlined',
  setFocus: () => {},
});

export const InputContentFrame = styled(Pressable, {
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

const InputInputFrame = styled(TextInput, {
  className: [
    'appearance-none',
    'focus-visible:!ring-offset-transparent focus-visible:!ring-transparent focus-visible:shadow-none',
    'text-white',
    'flex-1 w-full',
    'focus-visible:outline-0',
  ],
});

const InputIconFrame = styled(Pressable, {
  className: [],
});

export type InputRootProps = PropsWithChildren<
  Omit<
    GetProps<typeof Provider>,
    'as' | 'className' | 'children' | 'focus' | 'setFocus' | 'refInput'
  > & {
    value?: string;
    onChangeValue?: (value: string) => void;
    label?: string;
    icon?: ComponentType;
    iconAfter?: ComponentType;
  }
>;

type InputRootPropsSimple = Omit<InputRootProps, 'children'> & {
  children?: never;
};
type InputRootPropsAdvanced = Omit<
  InputRootProps,
  'label' | 'iconAfter' | 'icon' | 'children'
> &
  Pick<Required<InputRootProps>, 'children'> & {
    label?: never;
    iconAfter?: never;
    icon?: never;
  };

const InputRoot = forwardRef<
  any,
  InputRootPropsSimple | InputRootPropsAdvanced
>(
  (
    {
      children,
      label,
      iconAfter: IconAfter,
      icon: Icon,
      size,
      color,
      variant,
      value,
      onChangeValue,
    },
    ref
  ) => {
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
        refInput={ref}
      >
        <Label className="group focus:ring ring-orange-400">
          {children ??
            [
              label && <InputLabel key="InputLabel">{label}</InputLabel>,
              <InputContent key="InputContent">
                {Icon && (
                  <InputIcon key="InputIconLeft">
                    <Icon />
                  </InputIcon>
                )}
                <InputInput key="InputInput" ref={ref} />
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
);

const InputLabel = Label.Text;
const InputInput = memo(
  forwardRef<TextInput, GetProps<typeof InputInputFrame>>((props, ref) => {
    const { value, onChangeValue, setFocus } = useContext();

    return useMemo(
      () => (
        <Label.Input>
          <InputInputFrame
            value={value}
            onChangeText={onChangeValue}
            className="focus:ring ring-violet-400"
            {...props}
            onFocus={(e) => {
              props?.onFocus?.(e);
              setFocus(true);
            }}
            onBlur={(e) => {
              props?.onBlur?.(e);
              setFocus(false);
            }}
            ref={ref}
          />
        </Label.Input>
      ),
      [props, value]
    );
  })
);
const InputIcon = memo(
  ({
    children,
    ...props
  }: PropsWithChildren<GetProps<typeof InputIconFrame>>) => {
    const style = tw.style(InputInputFrame.styles().className);
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
const InputContent = forwardRef<
  any,
  PropsWithChildren<GetProps<typeof InputContentFrame>>
>(({ children, ...props }, ref) => {
  const { color, size, variant, focus } = useContext();
  return (
    <InputContentFrame
      color={color}
      size={size}
      variant={variant}
      space={'xs'}
      states={{ isFocus: focus }}
      {...props}
      ref={ref}
    >
      {children}
    </InputContentFrame>
  );
});

export const Input = withStaticProperties(InputRoot, {
  Label: InputLabel,
  Input: InputInput,
  Icon: InputIcon,
  Content: InputContent,
});
