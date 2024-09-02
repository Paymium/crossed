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

export type SelectItemProps = {
  disabled?: boolean;
  value?: string;
};
export const createSelectItem = <P extends Record<string, any>>(
  Styled: ComponentType<P>
) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  forwardRef<
    InferRef<typeof Styled>,
    SelectItemProps & RequiredAccessibilityProps<P, 'aria-label'>
  >((originalProps, ref) => {
    const { value, ...props } = originalProps as any;
    const { setOpen, setValue } = useContext();
    return (
      <RovingFocus.Item ref={ref} focusable={!(props as any).disabled}>
        <Styled
          tabIndex={(props as any).disabled ? -1 : 0}
          aria-disabled={((props as any).disabled || false).toString()}
          role="menuitem"
          {...(props as any)}
          onPress={composeEventHandlers((props as any).onPress, () => {
            setOpen(false);
            setValue(value);
          })}
        />
      </RovingFocus.Item>
    );
  });
