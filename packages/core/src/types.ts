/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type {
  ComponentType,
  ElementType,
  ForwardRefExoticComponent,
  HTMLProps,
  RefAttributes,
} from 'react';

export type OmitUndefined<T> = T extends undefined ? never : T;
export type StringToBoolean<T> = T extends 'true' | 'false' ? boolean : T;

export type StateName = 'focus' | 'hover' | 'disabled' | 'active';

export type PropsExtends<P> = P & { as?: any };

export type Base<P> = {
  className?: string[];
  props?: PropsExtends<P>;
};

export type BaseWithState<P> = State<P> & Base<P>;

export type State<P> = {
  [key in StateName as `:${key}`]?: Base<P>;
};

export type States = {
  isFocus: boolean;
  isHover: boolean;
  isActive: boolean;
};

export type ConfigSchema<P> = Record<string, Record<string, BaseWithState<P>>>;
export type ConfigSchemaUndefined<P> = undefined | ConfigSchema<P>;

export type ConfigVariants<T extends ConfigSchemaUndefined<any>> =
  T extends ConfigSchema<any>
    ? {
        [Variant in keyof T]?:
          | StringToBoolean<keyof T[Variant]>
          | null
          | undefined;
      }
    : {};

export type StylesFunction<P extends Record<string, any>> = (
  _p?: P
) => BaseWithState<P>;

export type StylesFunctionUndefined<P extends Record<string, any>> =
  | undefined
  | ((_p?: P) => BaseWithState<P>);

export type ConfigVariantsMulti<
  P extends Record<string, any>,
  T extends ConfigSchemaUndefined<P>
> = T extends ConfigSchema<any>
  ? {
      [Variant in keyof T]?:
        | StringToBoolean<keyof T[Variant]>
        | StringToBoolean<keyof T[Variant]>[]
        | undefined;
    }
  : {};

export type Config<
  P extends Record<string, any>,
  T extends ConfigSchemaUndefined<any>,
  E extends StylesFunctionUndefined<any> = undefined
> = BaseWithState<P> & {
  variants?: T;
  defaultVariants?: ConfigVariants<T> & PropsFromExtends<E>;
  extends?: E;
  compoundVariants?: (T extends ConfigSchemaUndefined<any>
    ? (ConfigVariants<T> | ConfigVariantsMulti<P, T>) &
        BaseWithState<P> &
        PropsFromExtends<E>
    : BaseWithState<P> & PropsFromExtends<E>)[];
};

export type Props<
  T extends ConfigSchemaUndefined<any>,
  P = undefined
> = T extends undefined
  ? BaseWithState<P>
  : BaseWithState<P> & ConfigVariants<T>;

export type StyledComponent<
  T extends ConfigSchemaUndefined<P>,
  P extends Record<string, any>,
  E extends StylesFunctionUndefined<P>
> = ForwardRefExoticComponent<
  NewComponentProps<T, P, E> & RefAttributes<any>
> & {
  styles: StylesFunction<
    Omit<PropsFromExtends<E>, keyof ConfigVariants<T>> & Props<T, P>
  >;
};

export type NewComponentProps<
  T extends ConfigSchemaUndefined<P>,
  P extends Record<string, any>,
  E extends StylesFunctionUndefined<P>
> = P &
  Omit<PropsFromExtends<E>, keyof ConfigVariants<T>> &
  ConfigVariants<T> & {
    className?: string;
    // animations?: boolean;
    states?: { isActive?: boolean; isFocus?: boolean; isHover?: boolean };
    hoverTheme?: boolean;
    activeTheme?: boolean;
    focusTheme?: boolean;
  };

export type GetProps<A extends StylableComponent<any>> =
  A extends StyledComponent<infer T, infer P, infer E>
    ? NewComponentProps<T, P, E>
    : A extends ComponentType<infer P>
    ? P
    : A extends ElementType
    ? HTMLProps<A>
    : A extends new (_props: infer P) => any
    ? P
    : {};

export type ConvertInterfaceToType<A extends object> = {
  [key in keyof A]: A[key];
};

export type ReactComponentWithRef<P, Ref> = ForwardRefExoticComponent<
  P & RefAttributes<Ref>
>;

export type StylableComponent<
  P extends Record<string, any>,
  T extends ConfigSchemaUndefined<P> = undefined,
  E extends StylesFunctionUndefined<P> = undefined
> =
  | StyledComponent<T, P, E>
  | ComponentType<P>
  | ForwardRefExoticComponent<P>
  | ReactComponentWithRef<P, any>
  | ElementType<P>
  | (new (_props: P) => any);

export type UnionToIntersection<U> = (
  U extends ConfigVariants<any> ? (_k: U) => string : never
) extends (_k: infer I) => string
  ? I
  : never;

export type PropsFromExtends<
  E extends StylesFunctionUndefined<any> = undefined
> = E extends StylesFunction<infer P> ? P : {};
