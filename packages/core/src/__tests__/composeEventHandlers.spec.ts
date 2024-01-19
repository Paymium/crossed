/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeEventHandlers } from '../composeEventHandlers';

describe('Box', () => {
  test('init', async () => {
    const cbOne = jest.fn();
    const cbTwo = jest.fn();
    const callback = composeEventHandlers(cbOne, cbTwo);
    callback({});
    expect(cbOne).toHaveBeenCalled();
    expect(cbTwo).toHaveBeenCalled();
  });
});
