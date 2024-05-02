/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { type PropsWithChildren, type ReactNode } from 'react';
import { useMedia } from '../useMedia';

export type AdaptProps = PropsWithChildren<{ fallback?: ReactNode }>;
export const Adapt = ({ children, fallback = null }: AdaptProps) => {
  const { md, lg, xl } = useMedia();
  return md || lg || xl ? children : fallback;
};
