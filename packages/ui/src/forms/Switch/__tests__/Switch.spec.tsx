/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Switch } from '../index';
import { screen, render, fireEvent } from '@crossed/test';

describe('Switch', () => {
  test('Simple render', () => {
    const onChange = jest.fn();
    render(<Switch onChange={onChange}>Simple</Switch>);
    const switchComp = screen.getByRole('switch');
    expect(switchComp).toHaveAttribute('aria-checked', 'false');
    fireEvent.click(switchComp);
    expect(onChange).toHaveBeenCalled();
    expect(switchComp).toHaveAttribute('aria-checked', 'true');
  });

  test('Disabled', () => {
    const onChange = jest.fn();
    render(
      <Switch onChange={onChange} disabled>
        Simple
      </Switch>
    );
    const switchComp = screen.getByRole('switch');
    expect(switchComp).toHaveAttribute('aria-checked', 'false');
    fireEvent.click(switchComp);
    expect(switchComp).toHaveAttribute('aria-checked', 'false');
    expect(onChange).not.toHaveBeenCalled();
  });
});
