/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type PropsWithChildren,
} from 'react';

export const VisibilityHidden = forwardRef(
  (
    { children, hidden = false }: PropsWithChildren & { hidden?: boolean },
    ref: any
  ) => {
    if (typeof children === 'string') {
      throw new Error(`"VisibilityHidden" not accept string children`);
    }
    return Children.map(children, (c) => {
      return isValidElement(c)
        ? cloneElement(c as any, {
            'aria-hidden': hidden.toString(),
            ref,
            ...(hidden
              ? {
                  style: {
                    position: 'absolute',
                    overflow: 'hidden',
                    clip: 'rect(0, 0, 0, 0)',
                    whiteSpace: 'nowrap',
                    wordWrap: 'normal',
                  },
                }
              : {}),
          })
        : null;
    });
  }
);
