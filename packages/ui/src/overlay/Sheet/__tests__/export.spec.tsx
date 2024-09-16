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
    const keys = Object.keys(Sheet);
    expect(keys.includes('Trigger')).toBeTruthy();
    expect(keys.includes('Frame')).toBeTruthy();
    expect(keys.includes('SnapVisible')).toBeTruthy();
  });
});
