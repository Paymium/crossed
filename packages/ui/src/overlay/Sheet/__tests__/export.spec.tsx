/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Sheet } from '../index';
import { describe, test, expect } from '@jest/globals';

describe('export Sheet', () => {
  test('all export exist', () => {
    expect(Object.keys(Sheet)).toEqual(['Trigger', 'Frame', 'SnapVisible']);
  });
});
