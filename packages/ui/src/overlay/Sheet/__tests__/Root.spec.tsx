/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React from 'react';
import { Root } from '../Root';
import { render } from '@crossed/test';
import { sheetContext } from '../context';
import { expect } from '@jest/globals';

jest.mock('../context', () => ({
  __esModule: true,
  sheetContext: {
    Provider: jest.fn(),
  },
}));

describe('SheetRoot', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('pass Child', async () => {
    const onOpenChange = jest.fn();
    render(<Root onOpenChange={onOpenChange}>toto</Root>);

    const Provider = sheetContext.Provider as unknown as jest.Mock<
      typeof sheetContext.Provider
    >;

    expect(Provider).toBeCalledTimes(1);

    const params = Provider.mock.calls[0][0];
    expect(params.value).toHaveProperty('dismissOnOverlayPress', true);
    expect(params.value).toHaveProperty('snapInitialHeight', { value: 0 });
    expect(params.value).toHaveProperty('offset', 60);
    expect(params.value).toHaveProperty('hideHandle', undefined);
    expect(params.value).toHaveProperty('full', undefined);
    expect(params.value).toHaveProperty('stickyFooter', undefined);
    expect(params.value).toHaveProperty('stickyHeader', undefined);
    expect(params.value).toHaveProperty('detach', undefined);
    expect(params.value).toHaveProperty('portal', true);
    expect(params.value).toHaveProperty('translateY', { value: null });
    expect(onOpenChange).toBeCalledTimes(0);
  });
});
