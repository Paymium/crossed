/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

/// <reference types="jest" />

import { className } from '../src/classNames';

describe('className', () => {
  test('only rnw style', () => {
    expect(
      className(
        { $$css: true, color: 'red' } as any,
        { $$css: true, color: 'green' } as any
      )
    ).toEqual({ style: {}, className: 'green' });
  });
  test('with StyleSheey', () => {
    expect(
      className(
        { $$css: true, color: 'red' } as any,
        { $$css: true, color: 'green' } as any
      )
    ).toEqual({ style: {}, className: 'green' });
  });
  test('with object style', () => {
    expect(
      className(
        { $$css: true, color: 'violet' } as any,
        { $$css: true, color: 'green' } as any,
        { color: 'red' }
      )
    ).toEqual({
      className: 'green',
      style: { color: 'red' },
    });
  });
  test('accept nullish value', () => {
    expect(
      className({ $$css: true, color: 'violet' } as any, false, undefined, true)
    ).toEqual({ className: 'violet', style: {} });
  });

  test('true and false are string', () => {
    expect(
      className(
        { $$css: true, color: 'violet' } as any,
        'false' as any,
        undefined,
        'true' as any
      )
    ).toEqual({ className: 'violet', style: {} });
  });
});
