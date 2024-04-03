/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

/// <reference types="jest" />

import { createStyles } from '../src/createStyles';

jest.mock('../src/useStyles');

describe('createStyles', () => {
  test('should return function', () => {
    const style = createStyles(() => ({}));
    expect(typeof style).toBe('function');
  });

  test('call return function', () => {
    const { useStyles } = jest.requireMock('../src/useStyles');
    const useStylesImpl = jest.fn(() => ({ titi: 'titi' }));
    useStyles.mockImplementation(useStylesImpl);
    const styleF = () => ({ bar: 'foo' });
    const style = createStyles(styleF)({ toto: 'toto' });
    expect(useStylesImpl).toBeCalledWith(styleF, { toto: 'toto' });
    expect(style).toEqual({ titi: 'titi' });
  });
});
