/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React from 'react';
import { Trigger } from '../Trigger';
import { render, screen, userEvent } from '@crossed/test';
import { expect, describe, test, jest } from '@jest/globals';
import { Text } from '../../../typography/Text';
import { Button } from '../../../forms/Button';
import { FloatingProvider } from '../../../overlay/Floating/context';

describe('SheetRoot', () => {
  test('onPress event should open', async () => {
    const onPress = jest.fn();
    const setOpen = jest.fn();
    const onClose = jest.fn();
    render(
      <FloatingProvider
        open={false}
        onOpen={setOpen}
        onClose={onClose}
        removeScroll={false}
      >
        <Trigger onPress={onPress}>
          <Text>toto</Text>
        </Trigger>
      </FloatingProvider>
    );

    expect(onPress).toBeCalledTimes(0);
    await userEvent.click(await screen.findByRole('button'));
    expect(onPress).toBeCalledTimes(1);
    expect(setOpen).toBeCalledTimes(1);
  });

  describe('asChild', () => {
    test('onPress event should open', async () => {
      const onPress = jest.fn();
      const setOpen = jest.fn();
      const onClose = jest.fn();
      render(
        <FloatingProvider
          open={false}
          onOpen={setOpen}
          onClose={onClose}
          removeScroll={false}
        >
          <Trigger onPress={onPress} asChild>
            <Button />
          </Trigger>
        </FloatingProvider>
      );

      expect(onPress).toBeCalledTimes(0);
      await userEvent.click(await screen.findByRole('button'));
      expect(onPress).toBeCalledTimes(1);
      expect(setOpen).toBeCalledTimes(1);
    });
  });
});
