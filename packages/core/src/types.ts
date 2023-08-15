import type {
  ComponentType,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

export type GetProps<A extends StylableComponent> = A extends ComponentType<
  infer Props
>
  ? Props
  : A extends new (props: infer Props) => any
  ? Props
  : {};

export type ConvertInterfaceToType<A extends object> = {
  [key in keyof A]: A[key];
};

export type ReactComponentWithRef<Props, Ref> = ForwardRefExoticComponent<
  Props & RefAttributes<Ref>
>;

export type StylableComponent =
  | ComponentType<any>
  | ForwardRefExoticComponent<any>
  | ReactComponentWithRef<any, any>
  | (new (props: any) => any);
