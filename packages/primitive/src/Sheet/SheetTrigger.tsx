/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentType, forwardRef } from 'react';
import type { RequiredAccessibilityProps } from '../types';
import { useContext } from './context';
import { composeEventHandlers } from '@crossed/core';

export const createSheetTrigger = <P,>(Styled: ComponentType<P>) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  forwardRef<any, RequiredAccessibilityProps<P, 'aria-label'>>((props, ref) => {
    const { open, setOpen } = useContext();
    return (
      <Styled
        {...(props as any)}
        ref={ref}
        onPress={composeEventHandlers((props as any).onPress, () => {
          setOpen(!open);
        })}
      />
    );
  });
