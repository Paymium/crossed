import { useUncontrolled } from '@crossed/core';
import { forwardRef, type ComponentType, useId } from 'react';
import { Provider } from './context';

export const createModalMain = <P,>(Styled: ComponentType<P>) =>
  forwardRef<
    any,
    P & {
      open?: boolean;
      defaultOpen?: boolean;
      onChangeOpen?: (_open: boolean) => void;
    }
  >((props, ref) => {
    const id = useId();
    const {
      open: openProps,
      defaultOpen = false,
      onChangeOpen,
      ...otherProps
    } = props;
    const [open, setOpen] = useUncontrolled({
      value: openProps,
      defaultValue: defaultOpen,
      onChange: onChangeOpen,
    });
    return (
      <Provider open={open} setOpen={setOpen} id={id}>
        <Styled {...(otherProps as any)} ref={ref} />
      </Provider>
    );
  });
