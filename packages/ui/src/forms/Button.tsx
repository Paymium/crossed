'use client';
import { styled, tw, type GetProps, useCrossedTheme } from '@crossed/styled';
import { createButton } from '@crossed/primitive';
import { Pressable, Text, View } from 'react-native';
import { Fragment, ReactNode, cloneElement } from 'react';
import { Box } from '../layout/Box';
import { useButtonContext } from '@crossed/primitive';
import { createScope } from '@crossed/core';

export const ButtonGroupFrame = styled(View, {
  className: ['overflow-hidden', 'rounded-md'],
  variants: {
    horizontal: {
      true: {
        className: ['flex-row'],
      },
    },
  },
  defaultVariants: {
    horizontal: true,
  },
});

export type ButtonGroupFrameProps = GetProps<typeof ButtonGroupFrame>;

export const ButtonFrame = styled(Pressable, {
  'className': [
    'rounded',
    'flex',
    'flex-row',
    'items-center',
    'border-2',
    'relative',
  ],
  ':disabled': {
    className: ['opacity-50', 'pointer-events-none', 'cursor-not-allowed'],
  },
  'props': { role: 'button' },
  'variants': {
    grouped: {
      true: {
        className: ['rounded-none'],
      },
    },
    color: {
      slate: {
        ':light': { className: ['border-slate-800 bg-slate-700'] },
        ':dark': { className: ['border-slate-800 bg-slate-800'] },
        ':active': {
          ':light': { className: ['bg-slate-600'] },
          ':dark': { className: ['bg-slate-700'] },
        },
        ':hover': {
          ':light': { className: ['bg-slate-500'] },
          ':dark': { className: ['bg-slate-600'] },
        },
      },
      gray: {
        ':light': { className: ['border-gray-800 bg-gray-700'] },
        ':dark': { className: ['border-gray-800 bg-gray-800'] },
        ':active': { className: ['bg-gray-700'] },
        ':hover': { className: ['bg-gray-600'] },
      },
      zinc: {
        'className': ['border-zinc-800 bg-zinc-800'],
        ':active': { className: ['bg-zinc-700'] },
        ':hover': { className: ['bg-zinc-600'] },
      },
      neutral: {
        'className': ['border-neutral-800 bg-neutral-800'],
        ':active': { className: ['bg-neutral-700'] },
        ':hover': { className: ['bg-neutral-600'] },
      },
      stone: {
        'className': ['border-stone-800 bg-stone-800'],
        ':active': { className: ['bg-stone-700'] },
        ':hover': { className: ['bg-stone-600'] },
      },
      red: {
        ':light': { className: ['border-red-700 bg-red-700'] },
        ':dark': { className: ['border-red-800 bg-red-800'] },
        ':active': {
          ':dark': { className: ['bg-red-700'] },
          ':light': { className: ['bg-red-600'] },
        },
        ':hover': {
          ':dark': { className: ['bg-red-600'] },
          ':light': { className: ['bg-red-500'] },
        },
      },
      orange: {
        'className': ['border-orange-800', 'bg-orange-800'],
        ':active': { className: ['bg-orange-700'] },
        ':hover': { className: ['bg-orange-600'] },
      },
      amber: {
        'className': ['border-amber-800', 'bg-amber-800'],
        ':active': { className: ['bg-amber-700'] },
        ':hover': { className: ['bg-amber-600'] },
      },
      yellow: {
        'className': ['border-yellow-800', 'bg-yellow-800'],
        ':active': { className: ['bg-yellow-700'] },
        ':hover': { className: ['bg-yellow-600'] },
      },
      lime: {
        'className': ['border-lime-800', 'bg-lime-800'],
        ':active': { className: ['bg-lime-700'] },
        ':hover': { className: ['bg-lime-600'] },
      },
      green: {
        'className': ['border-green-800', 'bg-green-800'],
        ':active': { className: ['bg-green-700'] },
        ':hover': { className: ['bg-green-600'] },
      },
      emerald: {
        'className': ['border-emerald-800', 'bg-emerald-800'],
        ':active': { className: ['bg-emerald-700'] },
        ':hover': { className: ['bg-emerald-600'] },
      },
      teal: {
        'className': ['border-teal-800', 'bg-teal-800'],
        ':active': { className: ['bg-teal-700'] },
        ':hover': { className: ['bg-teal-600'] },
      },
      cyan: {
        'className': ['border-cyan-800', 'bg-cyan-800'],
        ':active': { className: ['bg-cyan-700'] },
        ':hover': { className: ['bg-cyan-600'] },
      },
      sky: {
        'className': ['border-sky-800', 'bg-sky-800'],
        ':active': { className: ['bg-sky-700'] },
        ':hover': { className: ['bg-sky-600'] },
      },
      blue: {
        'className': ['border-blue-800', 'bg-blue-800'],
        ':active': { className: ['bg-blue-700'] },
        ':hover': { className: ['bg-blue-600'] },
      },
      indigo: {
        'className': ['border-indigo-800', 'bg-indigo-800'],
        ':active': { className: ['bg-indigo-700'] },
        ':hover': { className: ['bg-indigo-600'] },
      },
      violet: {
        'className': ['border-violet-800', 'bg-violet-800'],
        ':active': { className: ['bg-violet-700'] },
        ':hover': { className: ['bg-violet-600'] },
      },
      purple: {
        'className': ['border-purple-800', 'bg-purple-800'],
        ':active': { className: ['bg-purple-700'] },
        ':hover': { className: ['bg-purple-600'] },
      },
      fuchsia: {
        'className': ['border-fuchsia-800', 'bg-fuchsia-800'],
        ':active': { className: ['bg-fuchsia-700'] },
        ':hover': { className: ['bg-fuchsia-600'] },
      },
      pink: {
        'className': ['border-pink-800 bg-pink-800'],
        ':active': { className: ['bg-pink-700'] },
        ':hover': { className: ['bg-pink-600'] },
      },
      rose: {
        'className': ['border-rose-800', 'bg-rose-800'],
        ':active': { className: ['bg-rose-700'] },
        ':hover': { className: ['bg-rose-600'] },
      },
    },
    size: {
      xs: { className: ['px-2', 'py-1'] },
      sm: { className: ['px-2', 'py-1.5'] },
      md: { className: ['px-3', 'py-2'] },
      lg: { className: ['px-4', 'py-3'] },
      xl: { className: ['px-5', 'py-4'] },
    },
    space: {
      xs: { className: ['gap-1'] },
      sm: { className: ['gap-3'] },
      md: { className: ['gap-5'] },
      lg: { className: ['gap-7'] },
      xl: { className: ['gap-9'] },
    },
    unstyled: {
      true: {
        'className': ['bg-transparent border-transparent'],
        ':hover': { className: ['bg-transparent border-transparent'] },
        ':active': { className: ['bg-transparent border-transparent'] },
      },
    },
    variant: {
      filled: { className: ['border-transparent'] },
      outlined: {
        'className': ['bg-transparent'],
        ':active': { className: ['bg-neutral-300'] },
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

export type ButtonFrameProps = GetProps<typeof ButtonFrame>;

export const ButtonTextFrame = styled(Text, {
  className: ['font-semibold'],
  variants: {
    color: {
      slate: {
        ':light': { className: ['text-slate-800'] },
        ':dark': { className: ['text-slate-500'] },
      },
      gray: {
        ':light': { className: ['text-gray-800'] },
        ':dark': { className: ['text-gray-500'] },
      },
      zinc: {
        ':light': { className: ['text-zinc-800'] },
        ':dark': { className: ['text-zinc-500'] },
      },
      neutral: {
        ':light': { className: ['text-neutral-800'] },
        ':dark': { className: ['text-neutral-500'] },
      },
      stone: {
        ':light': { className: ['text-stone-800'] },
        ':dark': { className: ['text-stone-500'] },
      },
      red: {
        ':light': { className: ['text-red-700 '] },
        ':dark': { className: ['text-red-500'] },
      },
      orange: { className: ['text-orange-800'] },
      amber: { className: ['text-amber-800'] },
      yellow: { className: ['text-yellow-800'] },
      lime: { className: ['text-lime-800'] },
      green: { className: ['text-green-800'] },
      emerald: { className: ['text-emerald-800'] },
      teal: { className: ['text-teal-800'] },
      cyan: { className: ['text-cyan-800'] },
      sky: { className: ['text-sky-800'] },
      blue: { className: ['text-blue-500'] },
      indigo: { className: ['text-indigo-500'] },
      violet: { className: ['text-violet-500'] },
      purple: { className: ['text-purple-500'] },
      fuchsia: { className: ['text-fuchsia-500'] },
      pink: {
        ':light': { className: ['text-pink-800'] },
        ':dark': { className: ['text-pink-500'] },
      },
      rose: {
        ':light': { className: ['text-rose-800 '] },
        ':dark': { className: ['text-rose-500'] },
      },
    },
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
      ':dark': { className: ['text-white'] },
      ':light': { className: ['text-white'] },
    },
    {
      'unstyled': true,
      ':hover': { className: ['bg-tranparent'] },
      ':dark': { className: ['text-white'] },
      ':light': { className: ['text-black'] },
    },
  ],
});

export type ButtonTextFrameProps = GetProps<typeof ButtonTextFrame>;

const ButtonTextControlled = ({ ...props }: ButtonTextFrameProps) => {
  const variantsContext = useVariantContext();
  return <ButtonTextFrame {...variantsContext} {...props} />;
};

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

const [ProviderGroup, useGroupContext] = createScope<{ grouped?: boolean }>({});

type ContextVariant = Pick<
  ButtonFrameProps,
  'size' | 'color' | 'variant'
> | null;
const [ProviderVariant, useVariantContext] = createScope<ContextVariant>(null);

type ButtonRootProps =
  | (ButtonFrameProps & { text?: never; icon?: never; iconAfter?: never })
  | (Omit<ButtonFrameProps, 'children'> & {
      text: string;
      icon?: ReactNode;
      iconAfter?: ReactNode;
      children: never;
    });

const Button = createButton({
  Group: ({
    color,
    size,
    variant,
    ...props
  }: ButtonGroupFrameProps & ContextVariant) => {
    return (
      <ProviderVariant color={color} size={size} variant={variant}>
        <ProviderGroup grouped>
          <ButtonGroupFrame {...props} />
        </ProviderGroup>
      </ProviderVariant>
    );
  },
  Root: ({ children, text, icon, iconAfter, ...props }: ButtonRootProps) => {
    const { grouped } = useGroupContext();
    const variantsContext = useVariantContext();

    const ParentComp = variantsContext ? Fragment : ProviderVariant;
    const {
      color = props.color || 'neutral',
      size = props.size || 'md',
      variant = props.variant || 'outlined',
    } = variantsContext || {};

    return (
      <ParentComp {...{ color, size, variant }}>
        <ButtonFrame grouped={grouped} {...props} {...{ color, size, variant }}>
          {children ?? (
            <>
              {icon && <ButtonIconFrame>{icon}</ButtonIconFrame>}
              <ButtonTextControlled>{text}</ButtonTextControlled>
              {iconAfter && <ButtonIconFrame>{iconAfter}</ButtonIconFrame>}
            </>
          )}
        </ButtonFrame>
      </ParentComp>
    );
  },
  Text: ButtonTextControlled,
  Icon: ButtonIconFrame,
});

const { Text: ButtonText, Icon: ButtonIcon } = Button;

export { ButtonText, ButtonIcon, Button };
export type ButtonProps = GetProps<typeof Button>;
