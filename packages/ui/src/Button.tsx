import {
  createScope,
  styled,
  withStaticProperties,
  merge,
} from '@mergeui/core';
import { Pressable, Text } from 'react-native';
import {
  cloneElement,
  ReactElement,
  type ComponentType,
  type PropsWithChildren,
  useId,
} from 'react';
import { colorVariants } from './variants/colors';
import { sizeVariants } from './variants/size';
import type { GetProps } from './types';
import tw from 'twrnc';
import { Box } from './Box';
import { spaceVariants } from './variants';

const [Provider, useContext] = createScope<{
  size?: keyof typeof sizeVariants | null;
  color?: keyof typeof colorVariants | null;
  variant?: 'filled' | 'outlined' | null;
}>({
  size: 'md',
  color: 'zinc',
});

const [ButtonFrame] = styled(Pressable, {
  base: {
    styles: ['rounded-md', 'flex', 'flex-row', 'items-center', 'border-2'],
    props: {
      role: 'button',
    },
  },
  variants: {
    color: colorVariants,
    size: sizeVariants,
    space: spaceVariants,
    variant: {
      filled: { styles: ['border-transparent'] },
      outlined: {
        styles: ['bg-zinc-950', 'hover:bg-zinc-900 active:bg-zinc-800'],
      },
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'zinc',
    variant: 'outlined',
    space: 'xs',
  },
});

const [ButtonTextFrame, ButtonTextFrameStyles] = styled(Text, {
  base: {
    styles: ['font-semibold'],
  },
  variants: {
    color: (
      Object.keys(colorVariants) as (keyof typeof colorVariants)[]
    ).reduce<{
      [key in keyof typeof colorVariants]: (typeof colorVariants)[key];
    }>(
      (acc, keyColor) => {
        const { styles, ...colorVariant } = colorVariants[keyColor];
        (acc as any)[keyColor] = {
          ...colorVariant,
          styles: styles.filter((e) => e.startsWith('text-')),
        };

        return acc;
      },
      {} as {
        [key in keyof typeof colorVariants]: (typeof colorVariants)[key];
      }
    ),
    size: {
      xs: { styles: ['px-1', 'text-xs'] },
      sm: { styles: ['px-2', 'text-sm'] },
      md: { styles: ['px-3', 'text-base'] },
      lg: { styles: ['px-4', 'text-lg'] },
      xl: { styles: ['px-5', 'text-xl'] },
    },
    variant: {
      filled: { styles: [] },
      outlined: { styles: [] },
    },
  },
  compoundVariants: [{ variant: 'filled', className: ['text-white'] }],
});

type ButtonRootProps = GetProps<typeof ButtonFrame> & {
  text?: string;
  iconAfter?: ComponentType;
  icon?: ComponentType;
};

function ButtonRoot(
  props: Omit<ButtonRootProps, 'text' | 'iconAfter' | 'icon'>
): ReactElement;
function ButtonRoot(props: Omit<ButtonRootProps, 'children'>): ReactElement;
function ButtonRoot({
  text,
  iconAfter: IconAfter,
  icon: Icon,
  children,
  ...props
}: ButtonRootProps) {
  const id = useId();
  return (
    <Provider size={props.size} color={props.color} variant={props.variant}>
      <ButtonFrame {...props}>
        {children ??
          [
            Icon && (
              <ButtonIcon key="Icon">
                <Icon />
              </ButtonIcon>
            ),
            text && <ButtonText key={`buttonText-${id}`}>{text}</ButtonText>,
            IconAfter && (
              <ButtonIcon key={'IconAfter'}>
                <IconAfter />
              </ButtonIcon>
            ),
          ].filter(Boolean)}
      </ButtonFrame>
    </Provider>
  );
}

const ButtonText = (props: GetProps<typeof ButtonTextFrame>) => {
  const { size, variant, color } = useContext();

  return (
    <ButtonTextFrame size={size} variant={variant} color={color} {...props} />
  );
};

const ButtonIcon = ({
  children,
  ...props
}: PropsWithChildren<GetProps<typeof Box>>) => {
  const { color, variant, size } = useContext();
  const className = merge(ButtonTextFrameStyles({ color, variant, size }));
  const style = tw.style(className);

  return (
    <Box {...props}>
      {cloneElement(children as any, {
        size: Number(style.fontSize) * 1.2,
        color: style.color,
      })}
    </Box>
  );
};

export const Button = withStaticProperties(ButtonRoot, {
  Text: ButtonText,
  Icon: ButtonIcon,
});
