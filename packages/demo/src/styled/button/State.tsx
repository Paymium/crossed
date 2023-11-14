import { styled } from '@crossed/styled/styled';
import { memo, type PropsWithChildren } from 'react';
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
