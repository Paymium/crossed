/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { PropsWithChildren } from 'react';
import { SelectProvider, type Context } from './context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const Provider = ({
  children,
  ...props
}: PropsWithChildren<Context>) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SelectProvider {...props}>{children}</SelectProvider>
    </GestureHandlerRootView>
  );
};
