import {
  useRef,
  forwardRef,
  ComponentType,
  isValidElement,
  PropsWithChildren,
  Children,
  cloneElement,
} from 'react';
import { InputProvider, useInputContext } from './context';
import { composeEventHandlers, type States } from '@crossed/core';

export const createInputGroup = <P,>(Styled: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => {
    const styleRef = useRef<States>({
      isActive: false,
      isFocus: false,
      isHover: false,
    });
    const inputRef = useRef<any>(null);
    const setStyleRef = (style: Partial<States>) => {
      styleRef.current = {
        ...styleRef.current,
        ...style,
      };
    };
    return (
      <InputProvider
        states={styleRef}
        setStates={setStyleRef}
        inputRef={inputRef}
      >
        <Slot {...(props as any)}>
          <Styled {...(props as any)} ref={ref} />
        </Slot>
      </InputProvider>
    );
  });

const Slot = ({ children, ...props }: PropsWithChildren<any>) => {
  const { states, inputRef } = useInputContext();

  return isValidElement(children) && Children.count(children) === 1
    ? cloneElement(children, {
        ...props,
        states,
        onPress: composeEventHandlers(props.onPress, () => {
          console.log('on passe ici');
          inputRef.current?.focus();
        }),
      } as any)
    : children;
};
