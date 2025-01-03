/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Checkbox } from '../index';
import { screen, render, fireEvent } from '@crossed/test';

describe('Checkbox', () => {
  test('Simple render', () => {
    const onPress = jest.fn();
    render(<Checkbox onPress={onPress}>Simple</Checkbox>);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
    expect(onPress).toHaveBeenCalled();
  });

  test('Disabled', () => {
    const onPress = jest.fn();
    render(
      <Checkbox onPress={onPress} disabled>
        Simple
      </Checkbox>
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
    expect(onPress).not.toHaveBeenCalled();
  });
});
