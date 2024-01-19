/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentType, forwardRef } from 'react';
import { Provider, useContext } from './context';
import { RemoveScroll as RS } from '../utils/RemoveScroll';

export type ModalPortalProps = {};

export const createModalPortal = <P,>(Styled: ComponentType<P>) =>
  forwardRef<any, P & ModalPortalProps>(({ ...props }, ref) => {
    const { children, ...otherProps } = props as any;
    const context = useContext();
    const { open } = context;

    return open ? (
      <Styled {...otherProps} ref={ref}>
        <Provider {...context}>
          <RS enabled={open}>{children}</RS>
        </Provider>
      </Styled>
    ) : null;
  });
