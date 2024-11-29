/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { VisibilityHiddenComponent } from './types';
import { Slot } from '../../Slot';
import { Box } from '../../layout/Box';
import { composeStyles, inlineStyle } from '@crossed/styled';

export const VisibilityHidden: VisibilityHiddenComponent = ({
  hide,
  ...props
}) => {
  return (
    <Slot
      Comp={Box}
      {...props}
      ref={props.ref}
      aria-hidden={hide}
      style={composeStyles(
        hide &&
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
};

VisibilityHidden.displayName = 'VisibilityHidden';
