/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useContext } from './context';
import { ComponentType, forwardRef } from 'react';
import { composeEventHandlers } from '@crossed/core';

export const createLabelText = <P,>(StyledText: ComponentType<P>) =>
  forwardRef<any, Omit<P, 'children'> & { children: string | string[] }>(
    (props, ref) => {
      const { id, inputRef } = useContext();
      return (
        <StyledText
          ref={ref}
          id={`label-${id}`}
          role="label"
          htmlFor={id}
          {...(props as any)}
          onPress={composeEventHandlers((props as any).onPress, () => {
            inputRef?.current?.focus?.();
          })}
        />
      );
    }
  );
