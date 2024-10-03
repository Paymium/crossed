/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { forwardRef, type ComponentType } from 'react';
type Compact<A> = { [K in keyof A]: A[K] };

type Diff<A extends object, OK extends keyof A> = Compact<
  { [K in Exclude<keyof A, OK>]: A[K] } & { [K in OK]?: A[K] }
>;

export function withDefaultProps<A extends Record<string, any>>(
  Comp: ComponentType<A>,
  defaultProps: Partial<A>
) {
  return forwardRef<A['ref'], Diff<A, keyof typeof defaultProps>>(
    function WithDefaultPropsRender(props, ref) {
      return <Comp {...defaultProps} {...(props as any)} ref={ref} />;
    }
  );
}
