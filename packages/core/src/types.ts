import type {
  ConfigVariants,
  ConfigVariantsMulti,
} from '@crossed/class-variance-authority';

import type { StringToBoolean } from '@crossed/class-variance-authority/src/types';
import type {
  ComponentType,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

export type Base<P> = {
  className?: string[];
  animate?: string[];
  props?: P & { as?: string | ComponentType };
};

export type StateName = 'focus' | 'hover' | 'disabled' | 'active';

export type State<P> = {
  [key in StateName as `:${key}`]?: Base<P>;
};

export type BaseWithState<P> = State<P> & Base<P>;

export type Props<T> = T extends undefined
  ? {}
  : {
      [key in keyof T]?: StringToBoolean<keyof T[key]> | undefined;
    };

export type ConfigSchema<P> = Record<string, Record<string, BaseWithState<P>>>;

export type CompounedVariant<
  P,
  T extends ConfigSchema<P>
> = T extends ConfigSchema<P>
  ? (ConfigVariants<T> | ConfigVariantsMulti<T>) & BaseWithState<P>
  : BaseWithState<P>;

export type CVAThemed<P, T extends ConfigSchema<P>> = {
  variants?: T;
  defaultVariants?: ConfigVariants<T>;
  compoundVariants?: CompounedVariant<P, T>[];
};

export type ConfigSchemaTheme<P, T extends ConfigSchema<P>> = BaseWithState<P> &
  CVAThemed<P, T>;

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
