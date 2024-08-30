/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { PseudoClassPlugin } from '../../src/plugins/PseudoClass';

jest.mock('../../src/isWeb/isWeb', () => {
  return { isWeb: true };
});

describe('PseudoClassPlugin', () => {
  test('check all properties', () => {
    expect(PseudoClassPlugin.name).toEqual('PseudoClassPlugin');
    expect(PseudoClassPlugin.test).toEqual([
      ':hover',
      ':active',
      ':focus',
      ':focus-visible',
      ':disabled',
    ]);
    expect(PseudoClassPlugin.apply).toBeTruthy();
  });

  test('apply not call addClassname if isWeb false', () => {
    const addClassname = jest.fn();
    expect(
      PseudoClassPlugin.apply({
        addClassname,
        styles: { backgroundColor: 'red' },
        key: ':focus',
      })
    ).toBeFalsy();
    expect(addClassname).not.toBeCalled();
  });

  test('apply call addClassname when detect pseudoclass', () => {
    const addClassname = jest.fn();
    expect(
      PseudoClassPlugin.apply({
        isWeb: true,
        addClassname,
        styles: { backgroundColor: 'red' },
        key: ':focus',
      })
    ).toBeFalsy();
    expect(addClassname).toBeCalledTimes(1);
    expect(addClassname).toBeCalledWith({
      body: { 'focus:background-color-[red]': { backgroundColor: 'red' } },
      suffix: ':focus',
    });
  });

  test('several style should call several times addClassname', () => {
    const addClassname = jest.fn();
    expect(
      PseudoClassPlugin.apply({
        isWeb: true,
        addClassname,
        styles: { backgroundColor: 'red', color: 'red' },
        key: ':focus',
      })
    ).toBeFalsy();
    expect(addClassname).toBeCalledTimes(2);
    expect(addClassname).nthCalledWith(1, {
      body: { 'focus:background-color-[red]': { backgroundColor: 'red' } },
      suffix: ':focus',
    });
    expect(addClassname).nthCalledWith(2, {
      body: { 'focus:color-[red]': { color: 'red' } },
      suffix: ':focus',
    });
  });

  test('apply check if value is number', () => {
    const addClassname = jest.fn();
    expect(
      PseudoClassPlugin.apply({
        isWeb: true,
        addClassname,
        styles: { zIndex: 13 },
        key: ':focus',
      })
    ).toBeFalsy();
    expect(addClassname).toBeCalledTimes(1);
    expect(addClassname).toBeCalledWith({
      body: { 'focus:z-index-[13]': { zIndex: 13 } },
      suffix: ':focus',
    });
  });

  test('apply active pseudo class', () => {
    const addClassname = jest.fn();
    expect(
      PseudoClassPlugin.apply({
        isWeb: true,
        addClassname,
        styles: { fontSize: 13 },
        key: ':active',
      })
    ).toBeFalsy();
    expect(addClassname).toBeCalledTimes(1);
    expect(addClassname).toBeCalledWith({
      body: { 'active:font-size-[13px]': { fontSize: '13px' } },
      suffix: ':active:not(:disabled)',
    });
  });

  test('apply hover pseudo class', () => {
    const addClassname = jest.fn();
    expect(
      PseudoClassPlugin.apply({
        isWeb: true,
        addClassname,
        styles: { fontSize: 13 },
        key: ':hover',
      })
    ).toBeFalsy();
    expect(addClassname).toBeCalledTimes(1);
    expect(addClassname).toBeCalledWith({
      body: { 'hover:font-size-[13px]': { fontSize: '13px' } },
      suffix: ':hover:not(:disabled):not(:active)',
    });
  });
});
