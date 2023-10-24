import {
  type ComponentType,
  forwardRef,
  PropsWithChildren,
  isValidElement,
  cloneElement,
  Children,
} from 'react';
import { composeEventHandlers } from '@crossed/core';
import { useInputContext } from './context';

export const createInputElement = <P,>(Styled: ComponentType<P>) =>
  forwardRef<any, P & { stopPropagation?: boolean }>(
    ({ stopPropagation, children, ...props }, ref) => {
      return (
        <Styled {...(props as any)} ref={ref}>
          <Slot stopPropagation>{children}</Slot>
        </Styled>
      );
    }
  );

const Slot = ({
  children,
  stopPropagation = false,
  ...props
}: PropsWithChildren<Record<string, any> & { stopPropagation?: boolean }>) => {
  const { inputRef } = useInputContext();
  return isValidElement(children) && Children.count(children) === 1
    ? cloneElement(children, {
        ...props,
        onPress: composeEventHandlers(
          props.onPress,
          stopPropagation
            ? (e: any) => {
                console.log('ici', inputRef.current);
                !stopPropagation && inputRef.current?.focus();
                // stopPropagation && e.stopPropagation();
                // e.preventDefault();
              }
            : undefined
        ),
      } as any)
    : null;
};
