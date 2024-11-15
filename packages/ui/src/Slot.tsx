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

export type SlotProps<P> = P & SlotPropsInterface<P>;

export interface SlotPropsInterface<P> {
  Comp: ComponentType<P>;

  /**
   * When true, component expects a single child element.
   * Instead of rendering its own element, it will pass all props to that child,
   * merging together any event handling props.
   * When "except-style", the same behavior except Tamagui won't pass styles down from the parent,
   * only non-style props
   */
  asChild?: boolean;
}
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
