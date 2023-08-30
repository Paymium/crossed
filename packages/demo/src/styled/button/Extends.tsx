import { GetProps, merge, styled } from '@crossed/styled';
import { useState, type HtmlHTMLAttributes } from 'react';

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
  'variants': {
    variant: {
      filled: {
        className: ['border-neutral-800'],
      },
      oulined: {
        className: ['bg-transparent'],
      },
    },
  },
});

type ButtonProps = GetProps<typeof Button>;

const InputStyledFrom = styled(Button, {
  props: {
    as: 'input',
  },
});

const InputComponent = ({
  variant,
  ...props
}: HtmlHTMLAttributes<HTMLInputElement> &
  Partial<Pick<ButtonProps, 'variant'>>) => {
  const [isHover, setIsHover] = useState(false);
  const { className, ':hover': hoverState } = Button.styles({ variant });

  return (
    <input
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      {...props}
      className={merge(className, isHover && hoverState?.className)}
    />
  );
};

export const ButtonExtendsDemo = () => {
  return (
    <div className="flex flex-col gap-5 justify-center p-5">
      <Button>Hover or Press</Button>
      <InputStyledFrom />
      <InputComponent />
    </div>
  );
};
