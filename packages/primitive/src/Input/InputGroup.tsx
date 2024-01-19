/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  useRef,
  forwardRef,
  ComponentType,
  isValidElement,
  PropsWithChildren,
  Children,
  cloneElement,
  useState,
} from 'react';
import { InputProvider, useInputContext } from './context';
import { composeEventHandlers, type States } from '@crossed/core';

export const createInputGroup = <P,>(Styled: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => {
    const [states, setStates] = useState<States>({
      isActive: false,
      isFocus: false,
      isHover: false,
    });
    const inputRef = useRef<any>(null);
    return (
      <InputProvider
        states={states}
        setStates={(style: Partial<States>) =>
          setStates((old) => ({ ...old, ...style }))
        }
        inputRef={inputRef}
      >
        <Slot {...(props as any)}>
          <Styled {...(props as any)} ref={ref} />
        </Slot>
      </InputProvider>
    );
  });

const Slot = ({ children, ...props }: PropsWithChildren<any>) => {
  const { setStates, states, inputRef } = useInputContext();

  return isValidElement(children) && Children.count(children) === 1
    ? cloneElement(children, {
        ...props,
        states,
        onPointerEnter: composeEventHandlers(props.onPointerEnter, () => {
          setStates({ isHover: true });
        }),
        onPointerLeave: composeEventHandlers(props.onPointerLeave, () => {
          setStates({ isHover: false });
        }),
        onPress: composeEventHandlers(() => {
          inputRef.current?.focus();
        }, props.onPress),
      } as any)
    : children;
};
