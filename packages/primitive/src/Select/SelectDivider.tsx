/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { forwardRef, type ComponentType } from 'react';

export const createSelectDivider = <P extends Record<string, any>>(
  StyledRoot: ComponentType<P>
) =>
  forwardRef<P['ref'], P>((props, ref) => {
    return <StyledRoot role="separator" {...(props as any)} ref={ref} />;
  });
