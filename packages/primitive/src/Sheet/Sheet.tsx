/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useUncontrolled } from '@crossed/core';
import { forwardRef, type ComponentType, useId } from 'react';
import { Provider } from './context';

export const createSheetMain = <P,>(Styled: ComponentType<P>) =>
  forwardRef<
    any,
    P & {
      open?: boolean;
      defaultOpen?: boolean;
      onChangeOpen?: (_open: boolean) => void;
    }
  >((props, ref) => {
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
    const id = useId();
    return (
      <Provider open={open} setOpen={setOpen} id={id}>
        <Styled {...(otherProps as any)} ref={ref} />
      </Provider>
    );
  });
