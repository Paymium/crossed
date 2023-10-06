'use client';
import {
  styled,
  tw,
  type GetProps,
  useCrossedTheme,
  BaseWithState,
} from '@crossed/styled';
import { createButton } from '@crossed/primitive';
import { Pressable, Text } from 'react-native';
import { cloneElement } from 'react';
import { colorVariants } from '../variants/colors';
import { sizeVariants } from '../variants/size';
import { Box } from '../layout/Box';
import { spaceVariants } from '../variants';
import { useButtonContext } from '@crossed/primitive';

export const ButtonFrame = styled(Pressable, {
  'className': [
    'rounded-md',
    'flex',
    'flex-row',
    'items-center',
    'border-2',
    'relative',
  ],
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
    unstyled: {
      true: {},
      false: {},
    },
    variant: {
      filled: {
        className: ['border-transparent'],
      },
      outlined: {},
      unstyled: {
        'className': ['bg-transparent border-transparent'],
        ':hover': { className: ['bg-transparent border-transparent'] },
        ':active': { className: ['bg-transparent border-transparent'] },
      },
    },
  },
  'defaultVariants': {
    size: 'md',
    color: 'neutral',
    variant: 'outlined',
    space: 'xs',
    unstyled: false,
  },
});

const ButtonTextFrame = styled(Text, {
  className: ['font-semibold'],
  variants: {
    color: Object.entries(
      colorVariants as Record<string, BaseWithState<any>>
    ).reduce<{
      [key in keyof typeof colorVariants]: (typeof colorVariants)[key];
    }>(
      (
        acc,
        [
          keyColor,
          { className, ':light': light, ':dark': dark, ...colorVariant },
        ]
      ) => {
        const lightClassName = (light?.className || []).reduce<string[]>(
          (d, c) => [...d, ...c.split(' ')],
          []
        );
        const darkClassName = (dark?.className || []).reduce<string[]>(
          (d, c) => [...d, ...c.split(' ')],
          []
        );
        const flatClassName = (className || []).reduce<string[]>(
          (d, c) => [...d, ...c.split(' ')],
          []
        );

        (acc as any)[keyColor] = {
          ...colorVariant,
          ':light': {
            ...light,
            className: (lightClassName || []).filter((e) =>
              e.startsWith('text-')
            ),
          },
          ':dark': {
            ...dark,
            className: (darkClassName || []).filter((e) =>
              e.startsWith('text-')
            ),
          },
          'className': (flatClassName || []).filter((e) =>
            e.startsWith('text-')
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
      filled: { className: ['text-white'] },
      outlined: { className: ['bg-transparent'] },
    },
    unstyled: { true: {} },
  },
  defaultVariants: {
    size: 'md',
    color: 'neutral',
    variant: 'outlined',
  },
  compoundVariants: [
    {
      variant: 'outlined',
      className: ['bg-transparent'],
    },
    {
      'variant': 'filled',
      'className': ['text-white'],
      ':dark': {
        className: ['text-white'],
      },
      ':light': {
        className: ['text-white'],
      },
    },
    {
      'unstyled': true,
      ':hover': {
        className: ['bg-tranparent'],
      },
      ':dark': {
        className: ['text-white'],
      },
      ':light': {
        className: ['text-black'],
      },
    },
  ],
});

type ButtonIconFrameProps = GetProps<typeof Box>;
const ButtonIconFrame = ({ children, ...props }: ButtonIconFrameProps) => {
  const { color, variant, size } = useButtonContext();
  const { theme } = useCrossedTheme();
  const className = ButtonTextFrame.styles({
    color,
    variant,
    size,
  });
  const style = tw.style(
    className?.className,
    className?.[`:${theme}`]?.className
  );
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
    Root: ButtonFrame,
    Text: ButtonTextFrame,
    Icon: ButtonIconFrame,
  },
  {
    context: {
      size: 'md',
      variant: 'outlined',
    },
  }
);

const { Text: ButtonText, Icon: ButtonIcon } = Button;

export { ButtonText, ButtonIcon, Button };
export type ButtonProps = GetProps<typeof Button>;
