/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Registry } from '../src/Registry';
import { useTheme } from '../src/useTheme';
import { renderHook, act } from '@crossed/test';

jest.mock('../src/isWeb/isWeb', () => {
  return { isWeb: true };
});

describe('useTheme', () => {
  test('no theme', () => {
    Registry.setThemes({ dark: {}, light: {} });
    const { result } = renderHook(() => useTheme());
    expect(result.current).toEqual({});
  });
  test('with theme', () => {
    Registry.setThemes({
      dark: { dark: 'dark' },
      light: { light: 'light' },
    });
    const { result, rerender } = renderHook(() => useTheme());
    expect(result.current).toEqual({});

    act(() => {
      Registry.setThemeName('dark');
    });
    rerender();
    expect(result.current).toEqual({ dark: 'var(--dark)' });
    act(() => {
      Registry.setThemeName('light');
    });
    rerender();
    expect(result.current).toEqual({ light: 'var(--light)' });
  });
});
