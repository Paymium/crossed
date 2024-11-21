/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React from 'react';
import { Trigger } from '../Trigger';
import { render, screen, userEvent } from '@crossed/test';
import { SheetContext, sheetContext } from '../context';
import { expect, describe, test, jest } from '@jest/globals';
import { Text } from '../../../typography/Text';
import { Button } from '../../../buttons/Button';

describe('SheetRoot', () => {
  test('onPress event should open', async () => {
    const onPress = jest.fn();
    const setOpen = jest.fn();
    render(
      <sheetContext.Provider
        value={{ open: false, setOpen } as unknown as SheetContext}
      >
        <Trigger onPress={onPress}>
          <Text>toto</Text>
        </Trigger>
      </sheetContext.Provider>
    );

    expect(onPress).toBeCalledTimes(0);
    await userEvent.click(await screen.findByRole('button'));
    expect(onPress).toBeCalledTimes(1);
    expect(setOpen).toBeCalledWith(true);
  });

  describe('asChild', () => {
    test('onPress event should open', async () => {
      const onPress = jest.fn();
      const setOpen = jest.fn();
      render(
        <sheetContext.Provider
          value={{ open: false, setOpen } as unknown as SheetContext}
        >
          <Trigger onPress={onPress} asChild>
            <Button />
          </Trigger>
        </sheetContext.Provider>
      );

      expect(onPress).toBeCalledTimes(0);
      await userEvent.click(await screen.findByRole('button'));
      expect(onPress).toBeCalledTimes(1);
      expect(setOpen).toBeCalledWith(true);
    });
  });
});
