/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

/// <reference types="jest" />

import { composeStyles } from '../src/composeStyles';

describe('composeStyles', () => {
  test('return array style without modify', () => {
    expect(
      composeStyles(
        { $$css: true, color: 'red' } as any,
        { $$css: true, color: 'green' } as any,
        [{ $$css: true, color: 'green' } as any, false],
        true
      )
    ).toEqual([
      { $$css: true, color: 'red' } as any,
      { $$css: true, color: 'green' } as any,
      { $$css: true, color: 'green' },
      false,
      true,
    ]);
  });
});
