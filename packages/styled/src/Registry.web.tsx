/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useServerInsertedHTML } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { AppRegistry } from 'react-native';
import { Main } from 'next/document';

export const Registry = ({ children }: PropsWithChildren) => {
  useServerInsertedHTML(() => {
    AppRegistry.registerComponent('Main', () => Main);

    const { getStyleElement } = (AppRegistry as any).getApplication('Main');
    return <>{getStyleElement()}</>;
  });
  return children;
};
