import type {
  ComponentType,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';
import type { BaseWithState } from './cva';

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

export interface CustomColor {}

export interface CrossedConfig
  extends Omit<GenericTamaguiConfig, keyof CrossedCustomConfig>,
    CrossedCustomConfig {}

export interface CrossedCustomConfig {}

export type GenericTamaguiConfig = {
  variants?: {
    color?: Record<string, BaseWithState<any>>;
  };
};

export type CreateCrossedConfig<C extends Record<string, BaseWithState<any>>> =
  {
    variants: {
      color: C;
    };
  };

export type CreateCrossedConfigOptions<
  C extends Record<string, BaseWithState<any>>
> = {
  variants?: {
    color?: C;
  };
};
