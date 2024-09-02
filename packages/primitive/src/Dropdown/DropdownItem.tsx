/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentType, forwardRef } from 'react';
import { useContext } from './context';
import { composeEventHandlers, InferRef } from '@crossed/core';
import { RovingFocus } from '../utils/RovingFocus';
import type { RequiredAccessibilityProps } from '../types';

export type DropdownItemProps = {
  disabled?: boolean;
};
export const createDropdownItem = <P extends Record<string, any>>(
  Styled: ComponentType<P>
) =>
  forwardRef<
    InferRef<typeof Styled>,
    DropdownItemProps & RequiredAccessibilityProps<P, 'aria-label'>
  >((props, ref) => {
    const { setOpen } = useContext();
    return (
      <RovingFocus.Item ref={ref} focusable={!(props as any).disabled}>
        <Styled
          tabIndex={(props as any).disabled ? -1 : 0}
          aria-disabled={((props as any).disabled || false).toString()}
          role="menuitem"
          {...(props as any)}
          onPointerUp={composeEventHandlers((props as any).onPress, () => {
            setOpen(false);
          })}
        />
      </RovingFocus.Item>
    );
  });
