import { createButton } from '@crossed/primitive';
import type { GetProps } from '@crossed/styled';
import { styled } from '@crossed/styled/styled';
import { createScope } from '@crossed/core';
import { YBox } from '@crossed/ui';
import { Pressable, Text, TextProps, View } from 'react-native';

const Group = styled(View, {
  className: ['overflow-hidden', 'rounded-md'],
  variants: {
    horizontal: { true: { className: ['flex-row'] } },
    vertical: { true: { className: ['flex-row'] } },
  },
  defaultVariants: {
    horizontal: true,
  },
});

type GroupProps = GetProps<typeof Group>;

const Root = styled(Pressable, {
  'className': ['flex-row', 'bg-blue-500', 'rounded', 'px-3 py-2'],
  ':hover': {
    className: ['bg-blue-400'],
  },
  'variants': {
    grouped: {
      true: { className: ['rounded-none'] },
    },
  },
});

type RootProps = GetProps<typeof Root>;

const TextButton = styled(Text, {
  className: ['text-white'],
});
const IconButton = (props: TextProps) => {
  return <Text {...props} style={[{ color: 'white' }, props.style]} />;
};

const [ProviderGroup, useGroupContext] = createScope<{ grouped?: boolean }>({});

const Button = createButton({
  Group: (props: GroupProps) => {
    return (
      <ProviderGroup grouped>
        <Group {...props} />
      </ProviderGroup>
    );
  },
  Root: (props: RootProps) => {
    const { grouped } = useGroupContext();
    return <Root grouped={grouped} {...props} />;
  },
  Text: TextButton,
  Icon: IconButton,
});

export const CreateButtonGroupDemo = () => {
  return (
    <YBox className="gap-4 items-center">
      <Button.Group horizontal>
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
      <Button.Group horizontal={false}>
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
    </YBox>
  );
};
