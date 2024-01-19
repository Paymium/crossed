/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeEventHandlers } from '@crossed/core';
import { ComponentType, forwardRef } from 'react';
import { useContext } from './context';

export const createSheetHandle = <P,>(Styled: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => {
    const { setOpen } = useContext();
    return (
      <Styled
        {...(props as any)}
        onPress={composeEventHandlers((props as any).onPress, () =>
          setOpen(false)
        )}
        ref={ref}
      />
    );
  });
