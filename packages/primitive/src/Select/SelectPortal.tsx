/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentType, forwardRef } from 'react';
import { Provider, useContext } from './context';
import { RemoveScroll as RS } from '../utils';

export const createSelectPortal = <P,>(Styled: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => {
    const { children, ...otherProps } = props as any;
    const context = useContext();

    return (
      <Styled {...otherProps} ref={ref}>
        <Provider {...context}>
          <RS enabled={context.open}>{children}</RS>
        </Provider>
      </Styled>
    );
  });
