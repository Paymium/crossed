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
import { SheetProvider } from 'react-native-actions-sheet';
import { composeStyles, CrossedMethods, inlineStyle } from '@crossed/styled';

export const CrossedUIProvider = ({
  children,
  style,
}: PropsWithChildren<{ style?: CrossedMethods<any> }>) => {
  return (
    <PortalProvider>
      <GestureHandlerRootView
        {...composeStyles(
          inlineStyle(() => ({ base: { flex: 1 } })),
          style
        ).rnw()}
      >
        <SheetProvider>{children}</SheetProvider>
      </GestureHandlerRootView>
    </PortalProvider>
  );
};
