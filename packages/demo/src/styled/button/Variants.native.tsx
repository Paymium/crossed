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
  },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ButtonProps = GetProps<typeof Button>;

export const ButtonVariantsNativeDemo = () => {
  return (
    <div className="flex flex-col gap-5 justify-center">
      <Button>no rounded</Button>
      <Button rounded>rounded</Button>
      <Button rounded="lg">rounded-lg</Button>
    </div>
  );
};
