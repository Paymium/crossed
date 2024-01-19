/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentType, forwardRef } from 'react';
import { useContext } from './context';
import { composeEventHandlers } from '@crossed/core';
import { RovingFocus } from '../utils/RovingFocus';
import type { RequiredAccessibilityProps } from '../types';

export type DropdownItemProps = {
  disabled?: boolean;
};
export const createDropdownItem = <P extends Record<string, any>>(
  Styled: ComponentType<P>
) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  forwardRef<
    any,
    DropdownItemProps & RequiredAccessibilityProps<P, 'aria-label'>
  >((props, ref) => {
    const { setOpen } = useContext();
    return (
      <RovingFocus.Item ref={ref} focusable={!props.disabled}>
        <Styled
          tabIndex={props.disabled ? -1 : 0}
          aria-disabled={(props.disabled || false).toString()}
          role="menuitem"
          {...(props as any)}
          onPointerUp={composeEventHandlers((props as any).onPress, () => {
            setOpen(false);
          })}
        />
      </RovingFocus.Item>
    );
  });
