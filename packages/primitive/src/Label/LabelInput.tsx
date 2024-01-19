/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { PropsWithChildren, cloneElement, forwardRef } from 'react';
import { useContext } from './context';
import { composeRefs } from '@crossed/core';

export const LabelInput = forwardRef<any, PropsWithChildren>(
  ({ children }, ref) => {
    const { id, inputRef } = useContext();
    return cloneElement(children as any, {
      'ref': composeRefs(inputRef, ref),
      'aria-labelledby': `label-${id}`,
      id,
    });
  }
);
