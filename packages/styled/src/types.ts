import type {
  ComponentType,
  ElementType,
  ForwardRefExoticComponent,
  HTMLProps,
  RefAttributes,
} from 'react';

export type GetProps<A extends StylableComponent> = A extends ComponentType<
  infer Props
>
  ? Props
  : A extends ElementType
  ? HTMLProps<A>
  : A extends new (props: infer Props) => any
  ? Props
  : {};

export type ConvertInterfaceToType<A extends object> = {
  [key in keyof A]: A[key];
};

export type ReactComponentWithRef<Props, Ref> = ForwardRefExoticComponent<
  Props & RefAttributes<Ref>
>;

export type StylableComponent<P = any> =
  | ComponentType<P>
  | ForwardRefExoticComponent<P>
  | ReactComponentWithRef<P, any>
  | ElementType<P>
  | (new (props: P) => any);
