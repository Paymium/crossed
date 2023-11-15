import type { GetProps } from '@crossed/styled';
import { styled } from '@crossed/styled';
import { Pressable } from 'react-native';

const Button = styled(Pressable, {
  className: ['px-3 py-2', 'border border-neutral-700', 'bg-neutral-800'],
  props: {
    role: 'button',
  },
  variants: {
    rounded: {
      true: {
        className: ['rounded'],
      },
      sm: {
        className: ['rounded-sm'],
      },
      md: {
        className: ['rounded-md'],
      },
      lg: {
        className: ['rounded-lg'],
      },
    },
    variant: {
      filled: {
        className: ['bg-neutral-700'],
      },
    },
    transparent: {
      true: {
        className: ['bg-transparent'],
      },
    },
  },
  compoundVariants: [
    {
      variant: 'filled', // or variant: ["filled", ...]
      transparent: true,
      className: ['bg-neutral-700/50'],
    },
  ],
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ButtonProps = GetProps<typeof Button>;

export const ButtonCompoundVariantsDemo = () => {
  return (
    <div className="flex flex-col gap-5 justify-center bg-blue-500 p-5">
      <Button variant="filled">filled</Button>
      <Button transparent>transparent</Button>
      <Button variant="filled" transparent>
        compound
      </Button>
    </div>
  );
};
