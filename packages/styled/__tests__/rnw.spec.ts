/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

/// <reference types="jest" />

import { rnw } from '../src/rnw';

describe('rnw', () => {
  test('only rnw style', () => {
    expect(
      rnw(
        { $$css: true, color: 'red' } as any,
        { $$css: true, color: 'green' } as any
      )
    ).toEqual({ style: [{ $$css: true, color: 'green' }] });
  });
  test('with StyleSheey', () => {
    expect(
      rnw(
        { $$css: true, color: 'red' } as any,
        { $$css: true, color: 'green' } as any,
        { base: { color: 'red' } }
      )
    ).toEqual({ style: [{ $$css: true, color: 'red' }] });
  });
  test('with object style', () => {
    expect(
      rnw(
        { $$css: true, color: 'violet' } as any,
        { $$css: true, color: 'green' } as any,
        { color: 'red' }
      )
    ).toEqual({ style: [{ $$css: true, color: 'green' }, { color: 'red' }] });
  });
  test('accept nullish value', () => {
    expect(
      rnw({ $$css: true, color: 'violet' } as any, false, undefined, true)
    ).toEqual({ style: [{ $$css: true, color: 'violet' }] });
  });
});
