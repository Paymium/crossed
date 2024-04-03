/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Registry } from '../../src/Registry';
import { useStyles } from '../../src/useStyles';
import { renderHook } from '@crossed/test';
import { BasePlugin } from '../../src/plugins';

describe('useStyles', () => {
  test('no plugin, no style', () => {
    Registry.setThemes({});
    const { result } = renderHook(() => useStyles(() => ({}), {}));
    expect(result.current).toEqual({});
  });

  test('no plugin, with style but wrong level key', () => {
    Registry.setThemes({});
    const { result } = renderHook(() =>
      useStyles(() => ({ base: { color: 'white' } }), {})
    );
    expect(result.current).toEqual({});
  });

  test('no plugin, with style', () => {
    Registry.setThemes({});
    const { result } = renderHook(() =>
      useStyles(() => ({ root: { base: { color: 'white' } } }), {})
    );
    expect(result.current).toEqual({});
  });

  test('with plugin, with style', () => {
    Registry.setThemes({}).addPlugin(BasePlugin);
    const { result } = renderHook(() =>
      useStyles(() => ({ root: { base: { color: 'white' } } }), {})
    );
    expect(result.current).toEqual({
      root: { style: { color: 'white' }, className: '' },
    });
  });
});
