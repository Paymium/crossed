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
          'align-items-[center]': 'align-items-[center]',
          'border-bottom-left-radius-[8px]': 'border-bottom-left-radius-[8px]',
          'border-bottom-right-radius-[8px]':
            'border-bottom-right-radius-[8px]',
          'border-bottom-width-[1px]': 'border-bottom-width-[1px]',
          'border-left-width-[1px]': 'border-left-width-[1px]',
          'border-right-width-[1px]': 'border-right-width-[1px]',
          'border-style-[solid]': 'border-style-[solid]',
          'border-top-left-radius-[8px]': 'border-top-left-radius-[8px]',
          'border-top-right-radius-[8px]': 'border-top-right-radius-[8px]',
          'border-top-width-[1px]': 'border-top-width-[1px]',
          'box-sizing-[border-box]': 'box-sizing-[border-box]',
          'flex-[1]': 'flex-[1]',
          'focus-visible:outline-width-[0px]':
            'focus-visible:outline-width-[0px]',
          'height-[44px]': 'height-[44px]',
          'justify-content-[center]': 'justify-content-[center]',
          'flex-direction-[row]': 'flex-direction-[row]',
        },
        {},
      ],
    });
  });
});
