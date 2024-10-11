/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { cloneElement, ComponentType, forwardRef, isValidElement } from 'react';

export type SlotProps<P> = P & {
  Comp: ComponentType<P>;
  asChild?: boolean;
};
export const Slot = forwardRef(
  <P extends Record<string, any>>(
    { Comp, asChild, ...props }: SlotProps<P>,
    ref: P['ref']
  ) => {
    if (asChild && 'children' in props && isValidElement(props.children)) {
      const { children, ...rest } = props;
      return cloneElement(children, rest);
    }
    return <Comp {...(props as any)} ref={ref} />;
  }
);
