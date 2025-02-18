/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { render, fireEvent, screen } from '@crossed/test';
import { DayButton } from '../DayButton';
import { IDay } from '@crossed/use-calendar/src';

describe('DayButton', () => {
  const mockDay: IDay = {
    date: new Date(2025, 1, 15),
    isToday: false,
    isSelected: false,
    isAdjacentMonth: false,
  };
  const mockOnPress = jest.fn();

  test('renders correctly with given day', () => {
    render(<DayButton day={mockDay} onPress={mockOnPress} />);
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  test('calls onPress when clicked', () => {
    render(<DayButton day={mockDay} onPress={mockOnPress} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnPress).toHaveBeenCalled();
  });

  test('disables button if day is adjacent month', () => {
    render(
      <DayButton
        day={{ ...mockDay, isAdjacentMonth: true }}
        onPress={mockOnPress}
      />
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('applies correct styles when day is today', () => {
    render(
      <DayButton day={{ ...mockDay, isToday: true }} onPress={mockOnPress} />
    );
    expect(screen.getByText('15')).toHaveStyle('borderWidth: 2');
  });

  test('applies correct styles when day is selected', () => {
    render(
      <DayButton day={{ ...mockDay, isSelected: true }} onPress={mockOnPress} />
    );
    expect(screen.getByText('15')).toHaveClass(
      'color-[var(--components--action-primary-default-text)]'
    );
  });
});
