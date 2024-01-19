/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentType, forwardRef } from 'react';
import { useContext } from './context';

export const createModalTitle = <P,>(Styled: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => {
    const { id } = useContext();
    return <Styled id={`${id}-title`} {...props} ref={ref} />;
  });
