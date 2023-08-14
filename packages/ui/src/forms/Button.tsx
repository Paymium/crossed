import {
  createScope,
  styled,
  withStaticProperties,
  merge,
  tw,
  GetProps,
} from '@mergeui/core';
import { Text } from 'react-native';
import {
  cloneElement,
  ReactElement,
  // type ComponentType,
  type PropsWithChildren,
  useId,
  ComponentType,
} from 'react';
import { colorVariants } from '../variants/colors';
import { sizeVariants } from '../variants/size';
import { Box } from '../layout/Box';
import { spaceVariants } from '../variants';
import { useThemeContext } from '../Provider';
import { MotiPressable } from 'moti/interactions';

const [Provider, useContext] = createScope<{
  size?: keyof typeof sizeVariants;
  color?: keyof typeof colorVariants;
  variant?: 'filled' | 'outlined';
}>({
  size: 'md',
  color: 'zinc',
});

const ButtonFrame = styled(MotiPressable, {
  'className': ['rounded-md', 'flex', 'flex-row', 'items-center', 'border-2'],
  ':disabled': {
    className: ['opacity-50', 'pointer-events-none', 'cursor-not-allowed'],
  },
  'props': {
    accessibilityRole: 'button',
  },
  'variants': {
    color: colorVariants,
    size: sizeVariants,
    space: spaceVariants,
    variant: {
      filled: {
        animate: ['border-transparent dark:border-transparent'],
      },
      outlined: {
        'animate': ['dark:bg-zinc-950 bg-zinc-100'],
        ':hover': {
          animate: ['dark:bg-zinc-900 bg-zinc-300'],
        },
        ':active': {
          animate: ['dark:bg-zinc-800 bg-zinc-200'],
        },
      },
    },
  },
  'defaultVariants': {
    size: 'md',
    color: 'zinc',
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
      filled: { className: [] },
      outlined: { className: [] },
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
  size = 'md',
  color = 'zinc',
  variant = 'outlined',
  ...props
}: ButtonRootProps) {
  const id = useId();
  return (
    <Provider size={size} color={color} variant={variant}>
      <ButtonFrame size={size} color={color} variant={variant} {...props}>
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
  const { theme } = useThemeContext();
  const { color, variant, size } = useContext();
  const className = merge(ButtonTextFrame.styles({ color, variant, size }));

  tw.setColorScheme(theme);
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
