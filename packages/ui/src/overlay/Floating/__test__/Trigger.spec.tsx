/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { render, screen, userEvent } from '@crossed/test';
import { FloatingTrigger } from '../Trigger';
import { FloatingProvider } from '../context';
import { act } from 'react';

describe('Floating.Trigger', () => {
  const mount = (open?: boolean) => {
    expect(FloatingTrigger.displayName).toEqual('Floating.Trigger');
    const onClose = jest.fn();
    const onOpen = jest.fn();

    render(
      <FloatingProvider
        onClose={onClose}
        onOpen={onOpen}
        open={open ?? false}
        removeScroll={false}
      >
        <FloatingTrigger testID="trigger" />
      </FloatingProvider>
    );
    return { onClose, onOpen };
  };

  test('click for open', async () => {
    const { onOpen, onClose } = mount();
    await act(() => userEvent.click(screen.getByTestId('trigger')));
    expect(onOpen).toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });

  test('open', async () => {
    const { onOpen, onClose } = mount(true);
    await act(() => userEvent.click(screen.getByTestId('trigger')));
    expect(onClose).toHaveBeenCalled();
    expect(onOpen).not.toHaveBeenCalled();
  });
});
