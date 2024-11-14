/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  Children,
  cloneElement,
  ComponentType,
  forwardRef,
  isValidElement,
} from 'react';

export type SlotProps<P> = P & {
  Comp: ComponentType<P>;
  asChild?: boolean;
};
export const Slot = forwardRef(
  <P extends Record<string, any>>(
    { Comp, asChild, ...props }: SlotProps<P>,
    ref: P['ref']
  ) => {
    if (asChild && 'children' in props) {
      return Children.toArray(props.children).map((c) => {
        if (isValidElement(c)) {
          const { children, ...rest } = props;
          // console.log(c.props, rest);
          return cloneElement(c, {
            ...c.props,
            ...rest,
            ...(c.props.style && rest.style
              ? { style: [c.props.style, rest.style] }
              : {}),
            ref,
          });
        } else {
          // console.log('not found');
          return c;
        }
      });
    }
    return <Comp {...(props as any)} ref={ref} />;
  }
);

Slot.displayName = 'Slot';
