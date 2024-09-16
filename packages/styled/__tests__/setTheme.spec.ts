/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { setTheme } from '../src/setTheme/setTheme';
import { setTheme as setThemeWeb } from '../src/setTheme/setTheme';

jest.mock('../src/isWeb/isWeb', () => {
  return { isWeb: true };
});

describe('setTheme', () => {
  const removeOld = window.document.documentElement.classList.remove;
  const addOld = window.document.documentElement.classList.add;
  beforeEach(() => {
    window.document.documentElement.classList.remove = jest.fn();
    window.document.documentElement.classList.add = jest.fn();
  });
  afterEach(() => {
    window.document.documentElement.classList.remove = removeOld;
    window.document.documentElement.classList.add = addOld;
  });
  test('web', () => {
    setThemeWeb('old', 'new');

    expect(window.document.documentElement.classList.remove).toBeCalledWith(
      'old'
    );
    expect(window.document.documentElement.classList.add).toBeCalledWith('new');
  });
  test('native', () => {
    expect(setTheme('old', 'new')).toBe(undefined);
  });
});
