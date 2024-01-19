/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { forwardRef, type ComponentType } from 'react';
import { useContext } from './context';
import { RovingFocus } from '../utils/RovingFocus';
import { VisibilityHidden } from '../utils/VisibilityHidden';

export const createSelectContent = <P,>(StyledRoot: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => {
    const { id, open } = useContext();
    return (
      <RovingFocus>
        <VisibilityHidden hidden={!open}>
          <StyledRoot
            role="menu"
            {...props}
            ref={ref}
            id={id}
            aria-labelledby={`label-${id}`}
            autoFocus
          />
        </VisibilityHidden>
      </RovingFocus>
    );
  });
