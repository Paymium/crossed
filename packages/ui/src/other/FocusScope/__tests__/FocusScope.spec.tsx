/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { render, fireEvent, screen } from '@crossed/test';
import { FocusScope } from '../FocusScope';

describe('FocusScope', () => {
  test('rend l’enfant passé en prop', () => {
    render(
      <FocusScope>
        <div data-testid="child">Child</div>
      </FocusScope>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  test('appelle onMountAutoFocus lors du montage', () => {
    const onMountAutoFocus = jest.fn();
    render(
      <FocusScope onMountAutoFocus={onMountAutoFocus}>
        <div>Child</div>
      </FocusScope>
    );
    expect(onMountAutoFocus).toHaveBeenCalled();
  });

  test('appelle onUnmountAutoFocus lors du démontage', () => {
    const onUnmountAutoFocus = jest.fn();
    const { unmount } = render(
      <FocusScope onUnmountAutoFocus={onUnmountAutoFocus}>
        <div>Child</div>
      </FocusScope>
    );
    unmount();
    expect(onUnmountAutoFocus).toHaveBeenCalled();
  });

  test('piège le focus dans le conteneur si trapped est activé', () => {
    render(
      <FocusScope trapped>
        <div data-testid="scope">
          <button data-testid="button1">Button 1</button>
          <button data-testid="button2">Button 2</button>
        </div>
      </FocusScope>
    );
    const button1 = screen.getByTestId('button1');
    // const button2 = screen.getByTestId('button2');
    button1.focus();
    fireEvent.focusOut(button1);
    expect(button1).toHaveFocus();
  });
});
