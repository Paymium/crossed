import {
  createButton,
  useButtonGroupCollection,
  useButtonGroupContext,
} from '@crossed/primitive';
import type { GetProps } from '@crossed/styled';
import { styled } from '@crossed/styled';
import { UilBitcoinCircle, YBox } from '@crossed/ui';
import { Pressable, Text, View } from 'react-native';
import { forwardRef } from 'react';

const Group = styled(View, {
  className: ['flex'],
  variants: {
    orientation: {
      horizontal: { className: ['flex-row'] },
      vertical: { className: ['flex-col'] },
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

const Root = styled(Pressable, {
  'className': [
    'flex flex-row items-center gap-2',
    'bg-blue-500',
    'rounded',
    'px-3 py-2',
  ],
  ':hover': {
    className: ['bg-blue-400'],
  },
  ':focus': { className: ['z-10'] },
  'variants': {
    grouped: { true: { className: ['rounded-none'] } },
    first: { true: { className: ['rounded-l'] } },
    last: { true: { className: ['rounded-r'] } },
    orientation: { horizontal: { className: [] }, vertical: { className: [] } },
  },
  'compoundVariants': [
    {
      orientation: 'vertical',
      first: true,
      className: ['rounded-none rounded-t'],
    },
    {
      orientation: 'vertical',
      last: true,
      className: ['rounded-none rounded-b'],
    },
  ],
});

type RootProps = GetProps<typeof Root>;

const TextButton = styled(Text, {
  className: ['text-white', 'text-base'],
});

const Element = styled(View, {
  className: ['flex'],
});

const Button = createButton({
  Group,
  Root: forwardRef((props: RootProps, ref: any) => {
    const { grouped, orientation } = useButtonGroupContext();
    const getItems = useButtonGroupCollection();
    const index = getItems().findIndex(({ id }) => id === props.id);
    return (
      <Root
        grouped={grouped}
        first={index === 0}
        last={index === getItems().length - 1}
        orientation={orientation}
        {...props}
        ref={ref}
      />
    );
  }),
  Text: TextButton,
  Element: Element,
});

export const CreateButtonGroupDemo = () => {
  return (
    <YBox className="gap-4 items-center">
      <Button.Group orientation="horizontal">
        <Button aria-label="Button text">
          <Button.Text>text button</Button.Text>
        </Button>
        <Button aria-label="Button text">
          <Button.Text>text button</Button.Text>
        </Button>
        <Button aria-label="Button text">
          <Button.Text>text button</Button.Text>
        </Button>
      </Button.Group>
      <Button.Group orientation="vertical">
        <Button aria-label="Button text">
          <Button.Text>text button</Button.Text>
        </Button>
        <Button aria-label="Button text">
          <Button.Text>text button</Button.Text>
        </Button>
        <Button aria-label="Button text">
          <Button.Text>text button</Button.Text>
        </Button>
      </Button.Group>
      <Button aria-label="Button text">
        <Button.Text>text button</Button.Text>
      </Button>

      <Button aria-label="Button text">
        <Button.Element>
          <UilBitcoinCircle />
        </Button.Element>
        <Button.Text>text button</Button.Text>
      </Button>
    </YBox>
  );
};
