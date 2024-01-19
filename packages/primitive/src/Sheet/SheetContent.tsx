/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentType, forwardRef } from 'react';
import { FocusScope } from '../utils/FocusScope';
import { useContext } from './context';

export const createSheetContent = <P,>(Styled: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => {
    const { id } = useContext();
    return (
      <FocusScope trapped loop>
        <Styled
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${id}-title`}
          aria-describedby={`${id}-description`}
          {...(props as any)}
          ref={ref}
        />
      </FocusScope>
    );
  });
