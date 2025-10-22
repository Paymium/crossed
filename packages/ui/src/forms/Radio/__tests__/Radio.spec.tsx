/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Radio } from '../index';
import { screen, render, fireEvent } from '@crossed/test';

describe('Radio', () => {
  test('Simple render', () => {
    render(<Radio>Simple</Radio>);
    const radio = screen.getByRole('radio');
    expect(radio).toHaveAttribute('aria-checked', 'false');
    fireEvent.click(radio);
    expect(radio).toHaveAttribute('aria-checked', 'true');
  });

  test('Disabled', () => {
    const onPress = jest.fn();
    render(
      <Radio onValueChange={onPress} disabled>
        Simple
      </Radio>
    );
    const radio = screen.getByRole('radio');
    expect(radio).toHaveAttribute('aria-checked', 'false');
    fireEvent.click(radio);
    expect(radio).toHaveAttribute('aria-checked', 'false');
    expect(onPress).not.toHaveBeenCalled();
  });
});
