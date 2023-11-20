import { ComponentType, forwardRef } from 'react';
import { useContext } from './context';
import { composeEventHandlers } from '@crossed/core';
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
    any,
    SelectItemProps & RequiredAccessibilityProps<P, 'aria-label'>
  >(({ value, ...props }, ref) => {
    const { setOpen, setValue } = useContext();
    return (
      <RovingFocus.Item ref={ref} focusable={!props.disabled}>
        <Styled
          tabIndex={props.disabled ? -1 : 0}
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
