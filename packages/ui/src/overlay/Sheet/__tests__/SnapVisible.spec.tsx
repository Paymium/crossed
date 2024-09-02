/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React from 'react';
import { SnapVisible } from '../SnapVisible';
import { render, screen } from '@crossed/test';
import { sheetContext } from '../context';
import { expect, describe, test } from '@jest/globals';
import { PortalProvider } from '@gorhom/portal';

describe('SnapVisible', () => {
  test('snapshot', async () => {
    const snapInitialHeight = { value: 20 };
    const offset = 0;
    render(
      <PortalProvider>
        <sheetContext.Provider
          value={
            {
              snapInitialHeight,
              offset,
            } as any
          }
        >
          <SnapVisible testID="test" />
        </sheetContext.Provider>
      </PortalProvider>
    );
    expect(await screen.findByTestId('test')).toMatchSnapshot();
  });
});
