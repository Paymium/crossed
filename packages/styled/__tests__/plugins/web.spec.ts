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

describe('WebPlugin', () => {
  test('style', () => {
    const style = createStyles(() => ({
      container: {
        base: {
          borderWidth: 1,
          borderStyle: 'solid',
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
          height: 44,
          flexDirection: 'row',
          flex: 1,
        },
        web: {
          'base': { boxSizing: 'border-box' },
          ':focus-visible': { outlineWidth: 0 },
        },
      },
    }));
    expect(style.container.rnw()).toStrictEqual({
      style: [
        {
          '$$css': true,
          'alignItems': 'align-items-[center]',
          'borderRadius': 'border-radius-[8px]',
          'borderStyle': 'border-style-[solid]',
          'borderWidth': 'border-width-[1px]',
          'boxSizing': 'box-sizing-[border-box]',
          'flex': 'flex-[1]',
          'outlineWidth': 'focus-visible:outline-width-[0]',
          'height': 'height-[44px]',
          'justifyContent': 'justify-content-[center]',
          'flexDirection': 'flex-direction-[row]',
        },
        {},
      ],
    });
  });
});
