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

jest.mock('../src/isWeb/isWeb', () => {
  return { isWeb: true };
});

describe('extends with createStyles', () => {
  beforeAll(() => {
    Registry.addPlugin(BasePlugin);
  });

  const style = createStyles(() => ({
    container: { base: { color: 'white' } },
  }));

  test('style extends style', () => {
    expect(
      style.container.style({
        style: { color: 'black' },
      })
    ).toStrictEqual({
      style: { color: 'black' },
    });
  });

  test('style extends className', () => {
    expect(
      style.container.style({
        className: 'color',
      })
    ).toStrictEqual({
      style: { color: 'white' },
    });
  });

  test('style extends rnw', () => {
    expect(
      style.container.style({
        style: { $$css: true, color: 'color' },
      })
    ).toStrictEqual({
      style: { color: 'white' },
    });
  });

  test('className extends style', () => {
    expect(
      style.container.className({
        style: { color: 'black' },
      })
    ).toStrictEqual({
      className: 'color-[black]',
    });
  });

  test('className extends rnw', () => {
    expect(
      style.container.className({
        style: { $$css: true, color: 'color' },
      })
    ).toStrictEqual({
      className: 'color color-[white]',
    });
  });

  // test('className return', () => {
  //   const style = createStyles(() => ({
  //     container: { base },
  //   }));
  //   expect(style.container.className()).toStrictEqual({
  //     className: 'color-[white] border-color-[red]',
  //   });
  //   expect(
  //     style.container.className({
  //       style: { color: 'black', backgroundColor: 'white' },
  //     })
  //   ).toStrictEqual({
  //     className: 'color-[black] border-color-[red] background-color-[white]',
  //   });
  //   expect(
  //     style.container.className({
  //       style: { color: 'black', backgroundColor: 'white' },
  //       className: 'toto',
  //     })
  //   ).toStrictEqual({
  //     className:
  //       'toto color-[black] border-color-[red] background-color-[white]',
  //   });
  // });

  // test('rnw return', () => {
  //   const style = createStyles(() => ({
  //     container: { base },
  //   }));
  //   expect(style.container.rnw()).toStrictEqual({
  //     style: {
  //       '$$css': true,
  //       'color-[white]': 'color-[white]',
  //       'border-color-[red]': 'border-color-[red]',
  //     },
  //   });
  //   expect(
  //     style.container.rnw({
  //       style: { color: 'black', backgroundColor: 'white' },
  //     })
  //   ).toStrictEqual({
  //     style: {
  //       '$$css': true,
  //       'color-[black]': 'color-[black]',
  //       'border-color-[red]': 'border-color-[red]',
  //       'background-color-[white]': 'background-color-[white]',
  //     },
  //   });
  //   expect(
  //     style.container.rnw({
  //       style: { color: 'black', backgroundColor: 'white' },
  //       className: 'toto',
  //     })
  //   ).toStrictEqual({
  //     style: {
  //       '$$css': true,
  //       'color-[black]': 'color-[black]',
  //       'border-color-[red]': 'border-color-[red]',
  //       'background-color-[white]': 'background-color-[white]',
  //       'toto': 'toto',
  //     },
  //   });
  // });
});
