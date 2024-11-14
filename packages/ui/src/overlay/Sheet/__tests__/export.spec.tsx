/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import * as Sheet from '../index';
import { describe, test, expect } from '@jest/globals';

describe('export Sheet', () => {
  test('all export exist', () => {
    expect(Sheet).toHaveProperty('Sheet');
    expect(Sheet).toHaveProperty('SheetTrigger');
    expect(Sheet).toHaveProperty('SheetContent');
    expect(Sheet).toHaveProperty('SheetFlatList');
    expect(Sheet).toHaveProperty('SheetSnapVisible');
    expect(Sheet).toHaveProperty('SheetTitle');
    expect(Sheet).toHaveProperty('SheetFooter');

    expect(Sheet.Sheet).toHaveProperty('Trigger');
    expect(Sheet.Sheet).toHaveProperty('Content');
    expect(Sheet.Sheet).toHaveProperty('FlatList');
    expect(Sheet.Sheet).toHaveProperty('SnapVisible');
    expect(Sheet.Sheet).toHaveProperty('Title');
    expect(Sheet.Sheet).toHaveProperty('Footer');
  });
});
