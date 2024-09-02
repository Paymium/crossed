/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React from 'react';
import { Frame } from '../Frame';
import { render, screen } from '@crossed/test';
import { sheetContext } from '../context';
import { expect, jest, describe, test } from '@jest/globals';
import { PortalProvider } from '@gorhom/portal';

describe('Frame', () => {
  test('close', async () => {
    const snapInitialHeight = { value: 20 };
    const offset = 0;
    const open = true;
    const isMove = { value: 0 };
    const hideHandle = false;
    const height = { value: 300 };
    const onClose = jest.fn();
    render(
      <PortalProvider>
        <sheetContext.Provider
          value={
            {
              snapInitialHeight,
              offset,
              open,
              isMove,
              hideHandle,
              height,
              onClose,
            } as any
          }
        >
          <Frame testID="test" />
        </sheetContext.Provider>
      </PortalProvider>
    );
    expect(await screen.findByTestId('test')).toMatchSnapshot();
  });
  test('open', async () => {
    const snapInitialHeight = { value: 20 };
    const offset = 0;
    const open = true;
    const isMove = { value: 0 };
    const hideHandle = false;
    const height = { value: 300 };
    const onClose = jest.fn();
    render(
      <PortalProvider>
        <sheetContext.Provider
          value={
            {
              snapInitialHeight,
              offset,
              open,
              isMove,
              hideHandle,
              height,
              onClose,
            } as any
          }
        >
          <Frame testID="test" />
        </sheetContext.Provider>
      </PortalProvider>
    );
    expect(await screen.findByTestId('test')).toMatchSnapshot();
  });
});
