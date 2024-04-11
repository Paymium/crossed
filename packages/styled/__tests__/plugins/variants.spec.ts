/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

/// <reference types="jest" />

import { createStyles } from '../../src/createStyles';

jest.mock('../../src/isWeb/isWeb', () => {
  return { isWeb: true };
});

describe('VariantsPlugin', () => {
  test('style', () => {
    const style = createStyles(() => ({
      container: {
        base: { color: 'black' },
        variants: {
          role: {
            link: { 'base': { color: 'white' }, ':hover': { color: 'red' } },
          },
        },
      },
    }));
    expect(style.container.style()).toStrictEqual({
      style: { color: 'black' },
    });
    expect(style.container.style({})).toStrictEqual({
      style: { color: 'black' },
    });
    expect(style.container.style({ variants: {} })).toStrictEqual({
      style: { color: 'black' },
    });
    expect(style.container.style({ variants: { role: 'toto' } })).toStrictEqual(
      { style: { color: 'black' } }
    );
    expect(style.container.style({ variants: { role: 'link' } })).toStrictEqual(
      { style: { color: 'white' } }
    );
    expect(
      style.container.style({ variants: { role: 'link' }, hover: true })
    ).toStrictEqual({ style: { color: 'red' } });
  });

  test('className', () => {
    const style = createStyles(() => ({
      container: {
        base: { color: 'black' },
        variants: {
          role: {
            link: { 'base': { color: 'white' }, ':hover': { color: 'red' } },
          },
        },
      },
    }));
    expect(style.container.className({})).toStrictEqual({
      className: 'color-[black]',
    });
    expect(style.container.className({ variants: {} })).toStrictEqual({
      className: 'color-[black]',
    });
    expect(
      style.container.className({ variants: { role: 'toto' } })
    ).toStrictEqual({ className: 'color-[black]' });
    expect(
      style.container.className({ variants: { role: 'link' } })
    ).toStrictEqual({ className: 'color-[white] hover:color-[red]' });
    expect(
      style.container.className({ variants: { role: 'link' }, hover: true })
    ).toStrictEqual({ className: 'hover:color-[red] color-[red]' });
  });

  test('rnw', () => {
    const style = createStyles(() => ({
      container: {
        base: { color: 'black' },
        variants: {
          role: {
            link: { 'base': { color: 'white' }, ':hover': { color: 'red' } },
          },
        },
      },
    }));
    expect(style.container.rnw({})).toStrictEqual({
      style: { '$$css': true, 'color-[black]': 'color-[black]' },
    });
    expect(style.container.rnw({ variants: {} })).toStrictEqual({
      style: { '$$css': true, 'color-[black]': 'color-[black]' },
    });
    expect(style.container.rnw({ variants: { role: 'toto' } })).toStrictEqual({
      style: { '$$css': true, 'color-[black]': 'color-[black]' },
    });
    expect(style.container.rnw({ variants: { role: 'link' } })).toStrictEqual({
      style: {
        '$$css': true,
        'color-[white]': 'color-[white]',
        'hover:color-[red]': 'hover:color-[red]',
      },
    });
    expect(
      style.container.rnw({ variants: { role: 'link' }, hover: true })
    ).toStrictEqual({
      style: {
        '$$css': true,
        'color-[red]': 'color-[red]',
        'hover:color-[red]': 'hover:color-[red]',
      },
    });
  });
});
