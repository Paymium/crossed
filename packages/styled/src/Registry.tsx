/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useServerInsertedHTML } from 'next/navigation';
import { useRef, type PropsWithChildren } from 'react';
import { AppRegistry } from 'react-native';

export const Registry = ({ children }: PropsWithChildren) => {
  const ref = useRef(false);
  useServerInsertedHTML(() => {
    if (ref.current) return;
    ref.current = true;
    AppRegistry.registerComponent('Registry', () => Registry);

    const { getStyleElement } = (AppRegistry as any).getApplication('Registry');
    return <>{getStyleElement()}</>;
  });
  return children;
};
