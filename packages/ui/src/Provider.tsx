/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { setup } from './theme';
setup();

// export { CrossedTheme, useCrossedTheme } from '@crossed/styled';
import { PortalProvider } from '@gorhom/portal';
import type { PropsWithChildren } from 'react';

export const CrossedUIProvider = ({ children }: PropsWithChildren) => {
  return <PortalProvider>{children}</PortalProvider>;
};
