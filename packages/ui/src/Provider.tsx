/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

// export { CrossedTheme, useCrossedTheme } from '@crossed/styled';
import { PortalProvider } from '@gorhom/portal';
import type { PropsWithChildren } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const CrossedUIProvider = ({ children }: PropsWithChildren) => {
  return (
    <PortalProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {children}
      </GestureHandlerRootView>
    </PortalProvider>
  );
};
