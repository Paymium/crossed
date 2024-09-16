/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

/// <reference types="jest" />

import { createStyles } from '../src/createStyles';
import { Registry } from '../src/Registry';

jest.mock('../src/isWeb/isWeb', () => {
  return { isWeb: true };
});

describe('createStyles', () => {
  beforeAll(() => Registry.setThemes({}));
  test('function parameter', () => {
    const style = createStyles(() => ({ container: {} }));
    expect(style).toEqual({ container: {} });
  });

  test('object parameter after compilation', () => {
    // @ts-expect-error createStyles accept only function in runtime,
    // and change to object to buildtime
    const style = createStyles({ container: {} });
    expect(style).toEqual({ container: {} });
  });
});
