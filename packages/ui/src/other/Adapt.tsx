/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Suspense, type SuspenseProps } from 'react';
import { useMedia } from '../useMedia';

export type AdaptProps = SuspenseProps;
export const Adapt = ({ children, ...props }: AdaptProps) => {
  const { md } = useMedia();
  return <Suspense {...props}>{md && children}</Suspense>;
};
