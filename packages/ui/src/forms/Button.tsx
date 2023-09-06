'use client';
import { styled, tw, type GetProps } from '@crossed/styled';
import { createButton } from '@crossed/primitive';
import { Pressable, Text } from 'react-native';
import { cloneElement, type PropsWithChildren, ComponentType } from 'react';
import { colorVariants } from '../variants/colors';
import { sizeVariants } from '../variants/size';
import { Box } from '../layout/Box';
import { spaceVariants } from '../variants';
import { useThemeContext } from '../Provider';
import { useButtonContext } from '@crossed/primitive';

const ButtonFrame = styled(Pressable, {
  'className': ['rounded-md', 'flex', 'flex-row', 'items-center', 'border-2'],
  ':disabled': {
    className: ['opacity-50', 'pointer-events-none', 'cursor-not-allowed'],
  },
  'props': {
    role: 'button',
  },
  'variants': {
    color: colorVariants,
    size: sizeVariants,
    space: spaceVariants,
    variant: {
      filled: {
        className: ['border-transparent dark:border-transparent'],
      },
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
  'defaultVariants': {
    size: 'md',
    color: 'neutral',
    variant: 'outlined',
    space: 'xs',
  },
});

const ButtonTextFrame = styled(Text, {
  className: ['font-semibold'],
  variants: {
    color: Object.entries(colorVariants).reduce<{
      [key in keyof typeof colorVariants]: (typeof colorVariants)[key];
    }>(
      (acc, [keyColor, { className, ...colorVariant }]) => {
        const flatClassName = className.reduce<string[]>((d, c) => {
          return [...d, ...c.split(' ')];
        }, []);

        (acc as any)[keyColor] = {
          ...colorVariant,
          'className': (flatClassName || []).filter(
            (e) => e.startsWith('text-') || e.startsWith('dark:text-')
          ),
          ':active': undefined,
          ':hover': undefined,
          ':focus': undefined,
        };

        return acc;
      },
      {} as {
        [key in keyof typeof colorVariants]: (typeof colorVariants)[key];
      }
    ),
    size: {
      xs: { className: ['px-1', 'text-xs'] },
      sm: { className: ['px-2', 'text-sm'] },
      md: { className: ['px-3', 'text-base'] },
      lg: { className: ['px-4', 'text-lg'] },
      xl: { className: ['px-5', 'text-xl'] },
    },
    variant: {
      filled: { className: ['text-white dark:text-white'] },
      outlined: { className: ['bg-transparent dark:bg-transparent'] },
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'neutral',
    variant: 'outlined',
  },
  compoundVariants: [
    {
      variant: 'outlined',
      className: ['bg-transparent dark:bg-transparent'],
    },
    {
      variant: 'filled',
      className: ['text-white dark:text-white'],
    },
  ],
});

type ButtonRootProps = GetProps<typeof ButtonFrame> & {
  text?: string;
  iconAfter?: ComponentType;
  icon?: ComponentType;
};

type ButtonRootPropsSimple = Omit<ButtonRootProps, 'children'> & {
  children?: never;
};

type ButtonRootPropsAdvanced = Omit<
  ButtonRootProps,
  'text' | 'iconAfter' | 'icon'
> & {
  text?: never;
  iconAfter?: never;
  icon?: never;
};

function ButtonRoot(props: ButtonRootPropsSimple | ButtonRootPropsAdvanced) {
  return <ButtonFrame {...props} />;
}

const ButtonIconFrame = ({
  children,
  ...props
}: PropsWithChildren<GetProps<typeof Box>>) => {
  const { theme } = useThemeContext();
  const { color, variant, size } = useButtonContext();
  const className = ButtonTextFrame.styles({ color, variant, size });

  tw.setColorScheme(theme);
  const style = tw.style(className.className);
  return (
    <Box {...props}>
      {cloneElement(children as any, {
        size: style.fontSize ? Number(style.fontSize) * 1.2 : 24,
        color: style.color,
      })}
    </Box>
  );
};

const Button = createButton(
  {
    Root: ButtonRoot,
    Text: ButtonTextFrame,
    Icon: ButtonIconFrame,
  },
  {
    context: {
      // color: 'blue',
      size: 'md',
      variant: 'outlined',
    },
  }
);

const { Text: ButtonText, Icon: ButtonIcon } = Button;

export { ButtonText, ButtonIcon, Button };
