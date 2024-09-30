/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { memo, useMemo, type PropsWithChildren, type ReactNode } from 'react';
import { useMedia } from '../useMedia';
import { Platform, PlatformOSType } from 'react-native';

export const createSelect = (name: PlatformOSType) =>
  memo(({ children }: PropsWithChildren) => {
    return Platform.select({
      [name]: children,
    });
  });

export const Native = createSelect('native');
export const Web = createSelect('web');
export const IOs = createSelect('ios');
export const Android = createSelect('android');
export const MacOS = createSelect('macos');
export const Windows = createSelect('windows');

export type ResponsiveProps = PropsWithChildren<{
  fallback?: ReactNode;
  media: keyof ReturnType<typeof useMedia>;
}>;
export const Responsive = memo(
  ({ media, children, fallback }: ResponsiveProps) => {
    const allMedia = useMedia();
    const isShow = useMemo(() => {
      return allMedia[media];
    }, [media, allMedia]);
    return useMemo(
      () => (isShow ? children : fallback),
      [isShow, children, fallback]
    );
  }
);
