/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

/// <reference types="jest" />

import { createStyles } from '../src/createStyles';
import { BasePlugin } from '../src/plugins/Base';
import { Registry } from '../src/Registry';

jest.mock('../src/useStyles');

describe('createStyles', () => {
  beforeAll(() => {
    Registry.addPlugin(BasePlugin);
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
    });
    expect(
      style.container.className({
        style: { color: 'black', backgroundColor: 'white' },
      })
    ).toStrictEqual({
      className: 'color-[black] border-color-[red] background-color-[white]',
    });
    expect(
      style.container.className({
        style: { color: 'black', backgroundColor: 'white' },
        className: 'toto',
      })
    ).toStrictEqual({
      className:
        'toto color-[black] border-color-[red] background-color-[white]',
    });
  });

  test('rnw return', () => {
    const style = createStyles(() => ({
      container: { base },
    }));
    expect(style.container.rnw()).toStrictEqual({
      style: {
        '$$css': true,
        'color-[white]': 'color-[white]',
        'border-color-[red]': 'border-color-[red]',
      },
    });
    expect(
      style.container.rnw({
        style: { color: 'black', backgroundColor: 'white' },
      })
    ).toStrictEqual({
      style: {
        '$$css': true,
        'color-[black]': 'color-[black]',
        'border-color-[red]': 'border-color-[red]',
        'background-color-[white]': 'background-color-[white]',
      },
    });
    expect(
      style.container.rnw({
        style: { color: 'black', backgroundColor: 'white' },
        className: 'toto',
      })
    ).toStrictEqual({
      style: {
        '$$css': true,
        'color-[black]': 'color-[black]',
        'border-color-[red]': 'border-color-[red]',
        'background-color-[white]': 'background-color-[white]',
        'toto': 'toto',
      },
    });
  });

  // test('call return function', () => {
  //   const { useStyles } = jest.requireMock('../src/useStyles');
  //   const useStylesImpl = jest.fn(() => ({ titi: 'titi' }));
  //   useStyles.mockImplementation(useStylesImpl);
  //   const styleF = () => ({ bar: 'foo' });
  //   const style = createStyles(styleF)({ toto: 'toto' });
  //   expect(useStylesImpl).toBeCalledWith(styleF, { toto: 'toto' });
  //   expect(style).toEqual({ titi: 'titi' });
  // });
});
