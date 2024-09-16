/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { forwardRef, type ComponentType } from 'react';
import { withStaticProperties } from './withStaticProperties';
import type { InferRef } from './types';

export function withDefaultProps<P>(
  Comp: ComponentType<P>,
  defaultProps: Partial<P>
) {
  const { id, displayName } = Comp as any;
  return withStaticProperties(
    forwardRef<
      InferRef<typeof Comp>,
      Omit<P, keyof typeof defaultProps> &
        Partial<Pick<P, keyof typeof defaultProps>>
    >(function WithDefaultPropsRender(props, ref) {
      return <Comp {...defaultProps} {...(props as any)} ref={ref} />;
    }),
    { id, displayName } as {
      id?: string;
      displayName?: string;
    }
  );
}
