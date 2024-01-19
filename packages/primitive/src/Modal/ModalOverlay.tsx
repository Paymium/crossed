/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentType, forwardRef } from 'react';
import { useContext } from './context';
import { composeEventHandlers } from '@crossed/core';

export type SheetOverlayProps = {
  /**
   * Set to false for disable close when press on overlay
   * @default true
   */
  closeOnPress?: boolean;
};

export const createModalOverlay = <P,>(Styled: ComponentType<P>) =>
  forwardRef<any, P & SheetOverlayProps>(
    ({ closeOnPress = true, ...props }, ref) => {
      const { setOpen } = useContext();
      return (
        <Styled
          {...(props as any)}
          onPress={composeEventHandlers((props as any).onPress, () => {
            closeOnPress && setOpen(false);
          })}
          ref={ref}
        />
      );
    }
  );
