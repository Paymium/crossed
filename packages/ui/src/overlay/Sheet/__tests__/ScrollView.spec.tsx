/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React from 'react';
import { ScrollView } from '../ScrollView';
import { render, screen } from '@crossed/test';
import { sheetContext } from '../context';
import { expect, describe, jest, test } from '@jest/globals';
import { Text } from '../../../typography/Text';

describe('ScrollView', () => {
  test('not open', async () => {
    const snapInitialHeight = { value: 0 };
    const offset = 0;
    const open = false;
    const isMove = { value: 0 };
    const hideHandle = false;
    const height = { value: 0 };
    const onClose = jest.fn();
    render(
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
        <ScrollView testID="test">
          <Text>toto</Text>
        </ScrollView>
      </sheetContext.Provider>
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
        <ScrollView testID="test">
          <Text>toto</Text>
        </ScrollView>
      </sheetContext.Provider>
    );
    expect(await screen.findByTestId('test')).toMatchSnapshot();
  });
});
