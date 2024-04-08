/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { useEffect, useState, useTransition } from 'react';
import { Registry } from './Registry';

export const useTheme = () => {
  const [theme, setTheme] = useState(Registry.getTheme());
  const [, setTransition] = useTransition();
  useEffect(() => {
    const unsubscribe = Registry.subscribe(() => {
      setTransition(() => setTheme(Registry.getTheme()));
    });
    return unsubscribe;
  }, [setTheme, setTransition]);
  return theme;
};
