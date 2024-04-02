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

export type StyledComponent<P extends Record<string, any>> =
  ForwardRefExoticComponent<P & RefAttributes<any>>;

export type GetProps<A extends StylableComponent<any>> =
  A extends StyledComponent<infer P>
    ? P
    : A extends ComponentType<infer P>
    ? P
    : A extends ElementType
    ? HTMLProps<A>
    : A extends new (_props: infer P) => any
    ? P
    : never;

export type ReactComponentWithRef<P> = ForwardRefExoticComponent<P>;

export type StylableComponent<P extends Record<string, any>> =
  | StyledComponent<P>
  | ComponentType<P>
  | ForwardRefExoticComponent<P>
  | ReactComponentWithRef<P>
  // | ElementType<P>
  | (new (_props: P) => any);
