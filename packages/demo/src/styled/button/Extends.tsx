import { styled } from '@crossed/styled';

const Button = styled('button', {
  'className': ['px-3 py-2', 'border border-neutral-700', 'bg-neutral-800'],
  'props': {
    type: 'button',
  },
  ':hover': {
    className: ['bg-neutral-700'],
  },
  ':active': {
    className: ['bg-neutral-900'],
  },
});

const InputStyledFrom = styled('input', {
  extends: [Button.styles],
});

export const ButtonExtendsDemo = () => {
  return (
    <div className="flex flex-col gap-5 justify-center p-5">
      <Button>Hover or Press</Button>
      <InputStyledFrom placeholder="Placeholder" />
    </div>
  );
};