/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

/// <reference types="jest" />

import { createStyles } from '../src/createStyles';
import { BasePlugin } from '../src/plugins/Base';
import { PseudoClassPlugin } from '../src/plugins/PseudoClass';
import { Registry } from '../src/Registry';

jest.mock('../src/isWeb/isWeb', () => {
  return { isWeb: true };
});

describe('createStyles', () => {
  beforeAll(() => {
    Registry.addPlugin(BasePlugin).addPlugin(PseudoClassPlugin);
  });
  test('should return function', () => {
    const style = createStyles(() => ({ container: {} }));
    expect(typeof style).toBe('object');
    expect(style).toHaveProperty('container');
    expect(typeof style.container).toBe('object');
    expect(style.container).toHaveProperty('style');
    expect(style.container).toHaveProperty('className');
    expect(style.container).toHaveProperty('rnw');
  });

  const base = { color: 'white', borderColor: 'red' };

  test('style return', () => {
    const style = createStyles(() => ({
      container: { base },
    }));
    expect(style.container.style()).toStrictEqual({
      style: base,
    });

    expect(
      style.container.style({
        style: { color: 'black', backgroundColor: 'white' },
      })
    ).toStrictEqual({
      style: { ...base, color: 'black', backgroundColor: 'white' },
    });
  });

  test('className return', () => {
    const style = createStyles(() => ({
      container: { base },
    }));
    expect(style.container.className()).toStrictEqual({
      className: 'color-[white] border-color-[red]',
      style: {},
    });
    expect(
      style.container.className({
        style: { color: 'black', backgroundColor: 'white' },
      })
    ).toStrictEqual({
      className: 'color-[black] border-color-[red] background-color-[white]',
      style: {},
    });
    expect(
      style.container.className({
        style: { color: 'black', backgroundColor: 'white' },
        className: 'toto',
      })
    ).toStrictEqual({
      className:
        'toto color-[black] border-color-[red] background-color-[white]',
      style: {},
    });
  });

  test('rnw return', () => {
    const style = createStyles(() => ({
      container: { base },
    }));
    expect(style.container.rnw()).toStrictEqual({
      style: [
        {
          '$$css': true,
          'color-[white]': 'color-[white]',
          'border-color-[red]': 'border-color-[red]',
        },
        {},
      ],
    });
    expect(
      style.container.rnw({
        style: { color: 'black', backgroundColor: 'white' },
      })
    ).toStrictEqual({
      style: [
        {
          '$$css': true,
          'border-color-[red]': 'border-color-[red]',
          'color-[white]': 'color-[white]',
        },
        { color: 'black', backgroundColor: 'white' },
        {},
      ],
    });
    expect(
      style.container.rnw({
        style: { color: 'black', backgroundColor: 'white' },
        className: 'toto',
      })
    ).toStrictEqual({
      style: [
        {
          '$$css': true,
          'border-color-[red]': 'border-color-[red]',
          'color-[white]': 'color-[white]',
          'toto': 'toto',
        },
        { color: 'black', backgroundColor: 'white' },
        {},
      ],
    });
  });
});
