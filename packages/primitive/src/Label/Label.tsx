/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useId, type ComponentType, useRef, forwardRef } from 'react';
import { Provider } from './context';

export const createLabelMain = <P,>(StyledRoot: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => {
    const id = useId();
    const inputRef = useRef();
    return (
      <Provider id={id} inputRef={inputRef}>
        <StyledRoot {...props} ref={ref} />
      </Provider>
    );
  });
