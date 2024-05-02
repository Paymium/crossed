/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useMemo, type PropsWithChildren, type ReactNode } from 'react';
import { useMedia } from '../useMedia';

export type AdaptProps = PropsWithChildren<{
  fallback?: ReactNode;
  size?: keyof ReturnType<typeof useMedia>;
}>;
export const Adapt = ({
  children,
  size = 'md',
  fallback = null,
}: AdaptProps) => {
  const media = useMedia();
  const isShow = useMemo(() => {
    return media[size];
  }, [size, media]);
  return isShow ? children : fallback;
};
