/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '../../src/createStyles';
import { BasePlugin } from '../../src/plugins/Base';
import { PseudoClassPlugin } from '../../src/plugins/PseudoClass';
import { Registry } from '../../src/Registry';

jest.mock('../../src/isWeb/isWeb', () => {
  return { isWeb: true };
});

describe('PseudoClassPlugin', () => {
  beforeAll(() => {
    Registry.addPlugin(BasePlugin).addPlugin(PseudoClassPlugin);
  });
  test('basic', () => {
    const style = createStyles(() => ({
      container: {
        'base': { color: 'black' },
        ':hover': { color: 'white' },
        ':active': { color: 'red' },
      },
    }));
    expect(style.container.style()).toStrictEqual({
      style: { color: 'black' },
    });
    expect(style.container.style({})).toStrictEqual({
      style: { color: 'black' },
    });
    expect(style.container.style({ hover: false })).toStrictEqual({
      style: { color: 'black' },
    });
    expect(style.container.style({ hover: true })).toStrictEqual({
      style: { color: 'white' },
    });
  });

  test('className', () => {
    const style = createStyles(() => ({
      container: {
        'base': { color: 'black' },
        ':hover': { color: 'white' },
        ':active': { color: 'red' },
      },
    }));
    expect(style.container.className()).toStrictEqual({
      className: 'color-[black] hover:color-[white] active:color-[red]',
    });
    expect(style.container.className({})).toStrictEqual({
      className: 'color-[black] hover:color-[white] active:color-[red]',
    });
    expect(style.container.className({ hover: true })).toStrictEqual({
      className: 'hover:color-[white] color-[white] active:color-[red]',
    });
    expect(
      style.container.className({ hover: true, active: true })
    ).toStrictEqual({
      className: 'hover:color-[white] active:color-[red] color-[red]',
    });
    expect(style.container.className({ active: true })).toStrictEqual({
      className: 'hover:color-[white] active:color-[red] color-[red]',
    });
  });

  test('rnw', () => {
    const style = createStyles(() => ({
      container: {
        'base': { color: 'black' },
        ':hover': { color: 'white' },
        ':active': { color: 'red' },
      },
    }));
    expect(style.container.rnw()).toStrictEqual({
      style: {
        '$$css': true,
        'active:color-[red]': 'active:color-[red]',
        'color-[black]': 'color-[black]',
        'hover:color-[white]': 'hover:color-[white]',
      },
    });
    expect(style.container.rnw({})).toStrictEqual({
      style: {
        '$$css': true,
        'active:color-[red]': 'active:color-[red]',
        'color-[black]': 'color-[black]',
        'hover:color-[white]': 'hover:color-[white]',
      },
    });
    expect(style.container.rnw({ hover: true })).toStrictEqual({
      style: {
        '$$css': true,
        'active:color-[red]': 'active:color-[red]',
        'hover:color-[white]': 'hover:color-[white]',
        'color-[white]': 'color-[white]',
      },
    });
    expect(style.container.rnw({ active: true })).toStrictEqual({
      style: {
        '$$css': true,
        'active:color-[red]': 'active:color-[red]',
        'hover:color-[white]': 'hover:color-[white]',
        'color-[red]': 'color-[red]',
      },
    });
    expect(style.container.rnw({ active: true, hover: true })).toStrictEqual({
      style: {
        '$$css': true,
        'active:color-[red]': 'active:color-[red]',
        'hover:color-[white]': 'hover:color-[white]',
        'color-[red]': 'color-[red]',
      },
    });
  });
});
