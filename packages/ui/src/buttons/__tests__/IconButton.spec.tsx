/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React, { act } from 'react';
import { IconButton } from '../IconButton';
import { X } from '@crossed/unicons';
import { userEvent, render, screen } from '@crossed/test';

describe('IconButton', () => {
  it('renders correctly', () => {
    render(<IconButton />);
    const button = screen.getByRole('button');
    expect(button).toBeTruthy();
  });

  it('renders the provided children', () => {
    render(
      <IconButton>
        <X />
      </IconButton>
    );

    expect(screen.getByRole('button')).toMatchSnapshot();
  });

  it('calls onPress when pressed', async () => {
    const onPressMock = jest.fn();
    render(<IconButton onPress={onPressMock} />);
    const button = screen.getByRole('button');

    await act(() => userEvent.click(button));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', async () => {
    const onPressMock = jest.fn();
    render(<IconButton onPress={onPressMock} disabled />);
    const button = screen.getByRole('button');

    await act(() => userEvent.click(button, { pointerEventsCheck: 0 }));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('renders function-based children correctly', () => {
    const childMock = jest.fn(() => <X />);
    render(<IconButton>{childMock}</IconButton>);

    // Vérifie que la fonction enfant est appelée
    expect(childMock).toHaveBeenCalled();

    // Vérifie que l'icône est rendue
    expect(screen.getByRole('button')).toMatchSnapshot();
  });
});
