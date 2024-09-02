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
    expect(params.children).toEqual('toto');
    expect(params.value).toHaveProperty('dismissOnOverlayPress', true);
    expect(params.value).toHaveProperty('height', { value: 0 });
    expect(params.value).toHaveProperty('snapInitialHeight', { value: 0 });
    expect(params.value).toHaveProperty('isMove', { value: false });
    expect(params.value).toHaveProperty('offset', 60);
    expect(params.value).toHaveProperty('open', false);
    expect(params.value).toHaveProperty('hideHandle', undefined);
    expect(params.value).toHaveProperty('onClose');
    expect(params.value).toHaveProperty('setOpen');
    expect(onOpenChange).toBeCalledTimes(0);
  });

  test('event onOpenChange', async () => {
    const onOpenChange = jest.fn();
    render(<Root onOpenChange={onOpenChange}>toto</Root>);

    const params = (
      sheetContext.Provider as unknown as jest.Mock<
        typeof sheetContext.Provider
      >
    ).mock.calls[0][0];

    expect(onOpenChange).toBeCalledTimes(0);
    params.value.onClose();
    expect(onOpenChange).toBeCalledWith(false);
  });
});
