import type { GetProps } from '@crossed/styled';
import { styled } from '@crossed/styled/styled';
import { Pressable } from 'react-native';

const Button = styled(Pressable, {
  'className': ['px-3 py-2', 'border border-neutral-700', 'bg-neutral-800'],
  'props': {
    role: 'button',
  },
  ':hover': {
    className: ['bg-neutral-700'],
  },
  ':focus': {
    className: ['!outline-1', '!outline-blue-500'],
  },
  ':active': {
    className: ['bg-neutral-900'],
  },
  ':disabled': {
    className: ['opacity-50'],
  },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ButtonProps = GetProps<typeof Button>;

export const ButtonStateNativeDemo = () => {
  return (
    <div className="flex flex-col gap-5 justify-center p-5">
      <Button>Hover or Press</Button>
      <Button disabled>Disabled</Button>
      <Button states={{ isHover: true }}>hover</Button>
      <Button states={{ isFocus: true }}>focus</Button>
      <Button states={{ isActive: true }}>active</Button>
    </div>
  );
};
