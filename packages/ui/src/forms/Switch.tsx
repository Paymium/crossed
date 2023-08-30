import {
  GetProps,
  composeEventHandlers,
  createScope,
  useUncontrolled,
  withStaticProperties,
} from '@crossed/core';
import { styled } from '@crossed/styled';
import type { colorVariants, sizeVariants } from '../variants';
import { Label } from './Label';
import { Platform, Pressable, View } from 'react-native';
import { useSwitch, VisuallyHidden } from 'react-aria';
import { useRef } from 'react';

type Context = {
  size: keyof typeof sizeVariants;
  color: keyof typeof colorVariants;
  isChecked: boolean;
  setIsChecked: (p: boolean) => void;
  inputProps: any;
  ref: any;
};

const [Provider, useContext] = createScope<Context>({} as Context);

const LabelFrame = styled(Label, {
  className: ['flex-row'],
});

const SwitchThumbFrame = styled(Pressable, {
  className: ['flex-row relative items-center rounded-full'],
  variants: {
    size: {
      md: {
        className: ['w-10 bg-zinc-500'],
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const SwitchThumbIndicator = styled(View, {
  className: ['rounded-full absolute bg-white'],
  variants: {
    size: {
      md: {
        className: ['w-5 h-5'],
      },
    },
    checked: {
      true: {
        className: ['right-0'],
      },
      false: {
        className: ['left-0'],
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

type SwitchRootProps = {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChangeChecked?: (checked: boolean) => void;
} & Omit<
  Partial<Context>,
  'isChecked' | 'setIsChecked' | 'inputProps' | 'ref'
> &
  GetProps<typeof LabelFrame>;

const SwitchRoot = ({
  size = 'md',
  color = 'zinc',
  children,
  checked,
  defaultChecked,
  label,
  onChangeChecked,
  ...props
}: SwitchRootProps) => {
  const ref = useRef(null);

  const [isChecked, setIsChecked] = useUncontrolled({
    value: checked,
    defaultValue: defaultChecked,
    onChange: onChangeChecked,
  });

  const { inputProps } = useSwitch(
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
      size={size}
      color={color}
      isChecked={isChecked}
      setIsChecked={setIsChecked}
      inputProps={inputProps}
      ref={ref}
    >
      <LabelFrame {...props}>
        {children ?? (
          <>
            <SwitchThumb />
            {label && <SwitchLabel>{label}</SwitchLabel>}
          </>
        )}
      </LabelFrame>
    </Provider>
  );
};
const SwitchThumb = () => {
  const { isChecked, inputProps, ref, size, setIsChecked } = useContext();

  return (
    <SwitchThumbFrame onPress={() => setIsChecked(!isChecked)}>
      {Platform.OS === 'web' && (
        <VisuallyHidden>
          <Label.Input>
            <input {...inputProps} ref={ref} />
          </Label.Input>
        </VisuallyHidden>
      )}
      <SwitchThumbIndicator size={size as any} checked={isChecked} />
    </SwitchThumbFrame>
  );
};
const SwitchLabel = (props: GetProps<typeof Label.Text>) => {
  const { isChecked, setIsChecked } = useContext();
  return (
    <Label.Text
      {...props}
      onPress={
        composeEventHandlers(
          props.onPress,
          Platform.OS !== 'web' && (() => setIsChecked(!isChecked))
        ) as any
      }
    />
  );
};

export const Switch = withStaticProperties(SwitchRoot, {
  displayName: 'Switch',
  Thumb: SwitchThumb,
  Label: SwitchLabel,
});
