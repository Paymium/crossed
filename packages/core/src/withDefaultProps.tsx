/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { forwardRef, type ComponentType } from 'react';
import { withStaticProperties } from './withStaticProperties';

export function withDefaultProps<P extends Record<string, any>>(
  Comp: ComponentType<P>,
  defaultProps: Partial<P>
) {
  const { id, styleSheet, displayName } = Comp as any;
  return withStaticProperties(
    forwardRef(function WithDefaultPropsRender(
      props: Omit<P, keyof typeof defaultProps> &
        Partial<Pick<P, keyof typeof defaultProps>>,
      ref: any
    ) {
      return <Comp {...defaultProps} {...(props as any)} ref={ref} />;
    }),
    { id, styleSheet, displayName } as {
      id?: string;
      styleSheet: () => unknown;
      displayName?: string;
    }
  );
}
