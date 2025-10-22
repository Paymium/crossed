/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React from 'react';
import { render, screen, userEvent } from '@crossed/test';
import { CloseButton } from '../CloseButton';
import { inlineStyle } from '@crossed/styled';

describe('CloseButton', () => {
  it('renders correctly with default props', () => {
    render(<CloseButton />);
    const button = screen.getByRole('button', { name: /close/i });

    expect(button).toBeTruthy();
    expect(button).toHaveAttribute('aria-label', 'Close');
  });

  it('calls onPress when clicked', async () => {
    const onPressMock = jest.fn();
    render(<CloseButton onPress={onPressMock} />);

    const button = screen.getByRole('button', { name: /close/i });
    await userEvent.click(button);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', async () => {
    const onPressMock = jest.fn();
    render(<CloseButton onPress={onPressMock} disabled />);

    const button = screen.getByRole('button', { name: /close/i });
    await userEvent.click(button, { pointerEventsCheck: 0 });

    expect(onPressMock).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it('applies custom props and styles', () => {
    render(
      <CloseButton
        testID="close-button"
        style={inlineStyle(() => ({ base: { opacity: 0.8 } }))}
      />
    );
    const button = screen.getByTestId('close-button');

    expect(button).toBeTruthy();
  });

  it('renders the icon with the correct size', () => {
    render(<CloseButton />);
    const icon = screen.getByLabelText('Close').children[0]; // Supposant que l'icône a le rôle d'image
    expect(icon).toHaveAttribute('width', '20'); // Vérifie que la taille est correcte
    expect(icon).toHaveAttribute('height', '20');
  });
});
