/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '../createStyles';

describe('createStyles', () => {
  test('should return function', () => {
    const style = createStyles({});
    expect(typeof style).toBe('function');
  });

  test('call return function', () => {
    const style = createStyles({})();
    expect(style).toEqual({});
  });
});
