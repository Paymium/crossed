/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { forwardRef } from 'react';
import type { VisibilityHiddenComponent } from './types';
import { Slot } from '../../Slot';
import { Box } from '../../layout/Box';
import { composeStyles, inlineStyle } from '@crossed/styled';

export const VisibilityHidden: VisibilityHiddenComponent = forwardRef(
  ({ hide, ...props }, ref) => {
    return (
      <Slot
        Compo={Box}
        {...props}
        ref={ref}
        aria-hidden={hide}
        style={composeStyles(
          inlineStyle(() => ({
            base: {
              position: 'absolute',
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              whiteSpace: 'nowrap',
              wordWrap: 'normal',
            },
          })),
          props.style
        )}
      />
    );
  }
);
