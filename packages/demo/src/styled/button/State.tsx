import { type GetProps, styled } from '@crossed/styled';
import { memo, type PropsWithChildren } from 'react';

const Button = styled('button', {
  'className': ['px-3 py-2', 'border border-neutral-700', 'bg-neutral-800'],
  'props': {
    type: 'button',
    tabIndex: 0,
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

const Other = memo((props: PropsWithChildren) => {
  return <button {...props} />;
});

Other.displayName = 'Pressable';

export const ButtonStateDemo = () => {
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
