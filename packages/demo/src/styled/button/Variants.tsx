import { type GetProps, styled } from '@crossed/styled';

const Button = styled('button', {
  className: ['px-3 py-2', 'border border-neutral-700', 'bg-neutral-800'],
  props: {
    type: 'button',
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

export const ButtonVariantsDemo = () => {
  return (
    <div className="flex flex-col gap-5 justify-center">
      <Button>no rounded</Button>
      <Button rounded>rounded</Button>
      <Button rounded="lg">rounded-lg</Button>
    </div>
  );
};
