/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { useEffect, useState, useTransition } from 'react';
import { ThemeRegistry } from './Registry';

export const useTheme = () => {
  const [theme, setTheme] = useState(ThemeRegistry.getTheme());
  const [, setTransition] = useTransition();
  useEffect(() => {
    const unsubscribe = ThemeRegistry.subscribe(() =>
      setTransition(() => setTheme(ThemeRegistry.getTheme()))
    );
    return unsubscribe;
  }, [setTheme]);
  return theme;
};
