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
import type { InferRef } from '@crossed/core';

export const createDropdownContent = <P,>(StyledRoot: ComponentType<P>) =>
  forwardRef<InferRef<typeof StyledRoot>, P>((props, ref) => {
    const { id, open } = useContext();
    return (
      <RovingFocus>
        <VisibilityHidden hidden={!open}>
          <StyledRoot
            role="menu"
            {...(props as any)}
            ref={ref}
            id={id}
            aria-labelledby={`label-${id}`}
            autoFocus
          />
        </VisibilityHidden>
      </RovingFocus>
    );
  });
