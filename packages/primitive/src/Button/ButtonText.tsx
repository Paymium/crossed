/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentType, forwardRef } from 'react';
import { useContext } from './context';

export const createButtonText = <T extends Record<string, any>>(
  StyledText: ComponentType<T>
) =>
  forwardRef<any, T>((props, ref) => {
    const context = useContext();
    return <StyledText id={context.id} {...(props as any)} ref={ref} />;
  });
