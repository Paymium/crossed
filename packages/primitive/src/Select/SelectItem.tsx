import { ComponentType, forwardRef } from 'react';
import { useContext } from './context';
import { composeEventHandlers } from '@crossed/core';
import { RovingFocus } from '../utils/RovingFocus';
import type { RequiredAccessibilityProps } from 'src/types';

export type SelectItemProps = {
  disabled?: boolean;
};
export const createSelectItem = <P extends Record<string, any>>(
  Styled: ComponentType<P>
) =>
  //@ts-ignore
  forwardRef<
    any,
    SelectItemProps & RequiredAccessibilityProps<P, 'aria-label'>
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