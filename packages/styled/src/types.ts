import type {
  ComponentType,
  ElementType,
  ForwardRefExoticComponent,
  HTMLProps,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
import type {
  Base,
  BaseWithState,
  ConfigSchema,
  ConfigVariants,
  Props,
} from './crossed/types';

export type StyledComponent<
  T extends ConfigSchema<any>,
  P extends Record<string, any>,
  E extends ((e: any) => any)[],
  C extends NewComponentProps<any, any> = NewComponentProps<P, E>
> = ForwardRefExoticComponent<
  NewComponentProps<PropsWithoutRef<C>, E> & RefAttributes<any>
> & {
  styles: <PS extends Record<string, any> = P>(
    p?: Props<T, PS>
  ) => BaseWithState<PS>;
};

export type NewComponentProps<
  P extends Record<string, any>,
  E extends ((e: any) => any)[]
> = PropsFromExtends<E> & {
  className?: string;
  // animations?: boolean;
  states?: { isActive?: boolean; isFocus?: boolean; isHover?: boolean };
  $dark?: Base<P>;
  $light?: Base<P>;
} & Omit<P, 'className'>;

export type GetProps<A extends StylableComponent<any>> =
  A extends StyledComponent<any, NewComponentProps<infer P, any>, any>
    ? NewComponentProps<P, any>
    : A extends StyledComponent<any, infer P, any>
    ? P
    : A extends ComponentType<infer P>
    ? P
    : A extends ElementType
    ? HTMLProps<A>
    : A extends new (props: infer P) => any
    ? P
    : {};

export type ConvertInterfaceToType<A extends object> = {
  [key in keyof A]: A[key];
};

export type ReactComponentWithRef<P, Ref> = ForwardRefExoticComponent<
  P & RefAttributes<Ref>
>;

export type StylableComponent<P extends Record<string, any>> =
  | ComponentType<P>
  | ForwardRefExoticComponent<P>
  | StyledComponent<any, P, any>
  | ReactComponentWithRef<P, any>
  | ElementType<P>
  | (new (props: P) => any);

export type UnionToIntersection<U> = (
  U extends ConfigVariants<any> ? (k: U) => string : never
) extends (k: infer I) => string
  ? I
  : never;

export type PropsFromExtends<E extends ((props: any) => any)[]> =
  UnionToIntersection<Parameters<E[number]>[number]>;
