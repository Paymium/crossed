/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

/// <reference types="jest" />

import { pressable } from '../src/pressable';

describe('pressable', () => {
  test('return function', () => {
    const result = pressable(
      { $$css: true, color: 'red' } as any,
      { $$css: true, color: 'green' } as any
    );
    expect(typeof result.style).toEqual('function');
  });

  test('with $$css', () => {
    const result = pressable(
      false,
      { $$css: true, color: 'red' },
      { $$css: true, color: 'green' }
    );
    expect((result as any).style({})).toEqual([
      { $$css: true, color: 'green' },
    ]);
  });
});
