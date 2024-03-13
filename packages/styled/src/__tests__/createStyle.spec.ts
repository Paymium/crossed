/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyle } from '../createStyle';

jest.mock('../Registry');

describe('createStyle', () => {
  test('should return function', () => {
    const { Registry } = jest.requireMock('../Registry');
    Registry.getTheme.mockImplementation(jest.fn().mockReturnValue({}));
    const style = createStyle({});
    expect(typeof style).toBe('function');
  });

  describe('call return function', () => {
    test('with function params', () => {
      const { Registry } = jest.requireMock('../Registry');
      Registry.getTheme.mockImplementation(jest.fn().mockReturnValue({}));
      const style = createStyle(() => ({}))();
      expect(Registry.getTheme).toBeCalled();
      expect(style).toEqual({});
    });

    test('with object params', () => {
      const { Registry } = jest.requireMock('../Registry');
      Registry.getTheme.mockImplementation(jest.fn().mockReturnValue({}));
      const style = createStyle({})();
      expect(Registry.getTheme).toBeCalled();
      expect(style).toEqual({});
    });
  });
});
