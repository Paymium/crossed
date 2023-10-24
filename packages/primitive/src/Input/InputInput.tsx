import {
  type ComponentType,
  forwardRef,
  Fragment,
  PropsWithChildren,
  isValidElement,
  cloneElement,
  Children,
} from 'react';
import { useInputContext } from './context';
import { composeEventHandlers, composeRefs } from '@crossed/core';

export const createInput = <P, PGroup extends PropsWithChildren>(
  Styled: ComponentType<P>,
  Group: ComponentType<PGroup>
) =>
  forwardRef<any, P>((props, ref) => {
    const groupContext = useInputContext();
    const Container = groupContext ? Fragment : (Group as any);

    return (
      <Container>
        <Slot {...(props as any)} ref={ref}>
          <Styled {...(props as any)} />
        </Slot>
      </Container>
    );
  });

const Slot = forwardRef(
  ({ children, ...props }: PropsWithChildren<any>, ref: any) => {
    const { setStates, inputRef } = useInputContext();
    return isValidElement(children) && Children.count(children) === 1
      ? cloneElement(children, {
          ...props,
          ref: composeRefs(ref, inputRef.current),
          onBlur: composeEventHandlers(props.onBlur, () => {
            setStates({ isFocus: true });
          }),
          onFocus: composeEventHandlers(props.onBlur, () => {
            setStates({ isFocus: false });
          }),
        } as any)
      : children;
  }
);
