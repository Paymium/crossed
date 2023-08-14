import {
  GetProps,
  createScope,
  cx,
  merge,
  styled,
  tw,
  useUncontrolled,
  withStaticProperties,
} from '@mergeui/core';
import { Label } from './Label';
import { useRef, type PropsWithChildren, cloneElement } from 'react';
import { UilCheck } from '@iconscout/react-native-unicons';
import { Box } from '../layout/Box';
import { VisuallyHidden, useCheckbox } from 'react-aria';
import { Pressable, TextInput } from 'react-native';
import { colorVariants } from '../variants';

type Context = {
  isChecked: boolean;
  setIsChecked: (p: boolean) => void;
  inputProps: any;

  size?: CheckboxIndicatorFrameProps['size'];
  variant?: CheckboxIndicatorFrameProps['variant'];
  color?: CheckboxIndicatorFrameProps['color'];
};
const [Provider, useContext] = createScope<Context>({} as Context);

const CheckboxIndicatorFrame = styled(Pressable, {
  className: [
    'border-2',
    'overflow-hidden',
    'justify-center items-center',
    'rounded-md',
  ],
  variants: {
    size: {
      xs: { className: ['h-3 w-3 rounded-sm'] },
      sm: { className: ['h-4 w-4 rounded-sm'] },
      md: { className: ['h-5 w-5'] },
      lg: { className: ['h-6 w-6'] },
      xl: { className: ['h-7 w-7'] },
    },
    color: colorVariants,
    variant: {
      filled: { className: ['border-transparent dark:border-transparent'] },
      outlined: {
        'className': ['dark:bg-zinc-950 bg-zinc-100'],
        ':hover': {
          className: ['dark:bg-zinc-900 bg-zinc-300'],
        },
        ':active': {
          className: ['dark:bg-zinc-800 bg-zinc-200'],
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'zinc',
    variant: 'outlined',
  },
  compoundVariants: [
    { variant: 'filled', className: ['text-white dark:text-white'] },
  ],
});

type CheckboxIndicatorFrameProps = GetProps<typeof CheckboxIndicatorFrame>;

type CheckboxRootProps = {
  label?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  onChangeChecked?: (checked: boolean) => void;

  size?: CheckboxIndicatorFrameProps['size'];
  variant?: CheckboxIndicatorFrameProps['variant'];
  color?: CheckboxIndicatorFrameProps['color'];
};

const CheckboxRoot = ({
  children,
  label,
  defaultChecked,
  checked,
  onChangeChecked,
  size,
  variant,
  color,
}: PropsWithChildren<CheckboxRootProps>) => {
  const ref = useRef(null);
  const [isChecked, setIsChecked] = useUncontrolled({
    value: checked,
    defaultValue: defaultChecked,
    onChange: onChangeChecked,
  });
  const { inputProps } = useCheckbox(
    {},
    {
      isSelected: isChecked,
      setSelected: setIsChecked,
      toggle: () => setIsChecked(!isChecked),
    },
    ref
  );

  return (
    <Provider
      isChecked={isChecked}
      setIsChecked={setIsChecked}
      inputProps={inputProps}
      size={size}
      variant={variant}
      color={color}
    >
      <Label className="flex-row items-center" space="sm">
        {children ??
          [
            <CheckboxIndicator key="CheckboxIndicator">
              <CheckboxIcon>
                <UilCheck />
              </CheckboxIcon>
            </CheckboxIndicator>,
            label && <CheckboxLabel>{label}</CheckboxLabel>,
          ].filter(Boolean)}
      </Label>
    </Provider>
  );
};

const CheckboxGroup = () => null;

const CheckboxIndicator = (props: CheckboxIndicatorFrameProps) => {
  const { inputProps, setIsChecked, isChecked, size, variant, color } =
    useContext();
  return (
    <>
      <VisuallyHidden>
        <Label.Input>
          <TextInput {...inputProps} />
        </Label.Input>
      </VisuallyHidden>
      <CheckboxIndicatorFrame
        onPress={() => setIsChecked(!isChecked)}
        size={size}
        variant={variant}
        color={color}
        {...props}
      />
    </>
  );
};

const CheckboxIcon = ({ children, ...props }: GetProps<typeof Box>) => {
  const { isChecked } = useContext();
  const { color, variant, size } = useContext();
  const className = merge(
    CheckboxIndicatorFrame.styles({ color, variant, size })
  );

  const style = tw.style(className);
  return isChecked ? (
    <Box {...props} className={cx('', props.className)}>
      {cloneElement(children as any, {
        size: Number(style.fontSize) * 1.2,
      })}
    </Box>
  ) : null;
};

const CheckboxLabel = Label.Text;

export const Checkbox = withStaticProperties(CheckboxRoot, {
  Group: CheckboxGroup,
  Icon: CheckboxIcon,
  Indicator: CheckboxIndicator,
  Label: CheckboxLabel,
});
