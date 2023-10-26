import { createBadge } from '@crossed/primitive';
import { styled } from '@crossed/styled';
import { View } from 'react-native';
import { Text } from '../typography/Text';
import { Text as NText } from 'react-native';
import { ButtonFrame, ButtonFrameProps } from '../forms/Button';
import { type GetProps, createScope } from '@crossed/core';

const TextStyled = styled(NText, {
  extends: Text.styles,
  className: ['font-bold'],
  variants: {
    variant: {
      filled: { className: ['text-white'] },
      outlined: {},
    },
    size: {
      xs: { className: ['text-[10px]'] },
      sm: { className: ['text-[11px]'] },
      md: { className: ['text-[12px]'] },
      lg: { className: ['text-[13px]'] },
      xl: { className: ['text-[14px]'] },
    },
  },
});

type BadgeTextStyledProps = GetProps<typeof TextStyled>;

const BadgeTextFrame = (props: BadgeTextStyledProps) => {
  const { color, size, variant } = useContext();

  return (
    <TextStyled
      {...props}
      color={props.color ?? color}
      size={props.size ?? size}
      variant={props.variant ?? variant}
    />
  );
};

const BadgeFrame = styled(View, {
  'className': ['border'],
  ':hover': { className: ['bg-transparent'] },
  'extends': ButtonFrame.styles,
  'variants': {
    size: {
      xs: { className: ['px-1', 'py-px'] },
      sm: { className: ['px-1', 'py-px'] },
      md: { className: ['px-1', 'py-px'] },
      lg: { className: ['px-1', 'py-px'] },
      xl: { className: ['px-1', 'py-px'] },
    },
  },
});

type BadgeFrameProps = GetProps<typeof BadgeFrame>;

type Context = Pick<ButtonFrameProps, 'color' | 'size' | 'variant'>;
const [Provider, useContext] = createScope<Context>({});

const Badge = createBadge({
  Text: BadgeTextFrame,
  Root: ({
    text,
    children,
    size = 'xs',
    ...props
  }:
    | (BadgeFrameProps & { text?: never })
    | (Omit<BadgeFrameProps, 'children'> & {
        children?: never;
        text: string;
      })) => {
    return (
      <Provider
        color={props.color ?? 'neutral'}
        size={size}
        variant={props.variant ?? 'outlined'}
      >
        <BadgeFrame {...props} size={size}>
          {children ?? <BadgeTextFrame>{text}</BadgeTextFrame>}
        </BadgeFrame>
      </Provider>
    );
  },
});

const { Text: BadgeText } = Badge;

export { Badge, BadgeText };
