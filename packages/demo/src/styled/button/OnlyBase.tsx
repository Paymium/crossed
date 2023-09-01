import { type GetProps, styled } from '@crossed/styled';

const Button = styled('button', {
  className: [
    'px-3 py-2',
    'border border-neutral-700',
    'bg-neutral-800',
    'rounded-md',
  ],
  props: {
    type: 'button',
  },
});

type ButtonProps = GetProps<typeof Button>;

export const ButtonOnlyBaseDemo = (props: ButtonProps) => {
  return <Button {...props}>Hello world</Button>;
};
