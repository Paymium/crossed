import { createScope, styled, withStaticProperties } from '@mergeui/core';
import { Pressable, Text } from 'react-native';
import type {
  ComponentType,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';
import { colorVariants } from './variants/colors';
import { sizeVariants } from './variants/size';

const [Provider, useContext] = createScope({
  size: 'md',
  color: 'slate',
});

const ButtonFrame = styled(Pressable, {
  base: {
    styles: ['rounded'],
    props: {
      role: 'button',
      // dataSet: { test: 'test' },
    },
  },
  variants: {
    color: colorVariants,
    size: sizeVariants,
  },
  defaultVariants: {
    size: 'md',
    color: "zinc"
  },
});

const ButtonText = styled(Text, {
  base: {
    styles: ['text-white'],
    // props: { as: 'span' },
  },
  variants: {
    size: {
      xs: ['text-xs'],
      sm: ['text-sm'],
      md: ['text-md'],
      lg: ['text-lg'],
      xl: ['text-xl'],
    },
  },
});

type ReactComponentWithRef<Props, Ref> = ForwardRefExoticComponent<
  Props & RefAttributes<Ref>
>;

type StylableComponent =
  | ComponentType<any>
  | ForwardRefExoticComponent<any>
  | ReactComponentWithRef<any, any>
  | (new (props: any) => any);

type GetProps<A extends StylableComponent> = A extends ComponentType<
  infer Props
>
  ? Props
  : A extends new (props: infer Props) => any
  ? Props
  : {};

export const Button = withStaticProperties(
  (props: GetProps<typeof ButtonFrame>) => (
    <Provider size={props.size} color={props.color}>
      <ButtonFrame {...props} />
    </Provider>
  ),
  {
    Text: (props: GetProps<typeof ButtonText>) => {
      const { size } = useContext();
      console.log(size);
      return <ButtonText size={size} {...props} />;
    },
  }
);
