/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { render, screen } from '@crossed/test';
import { Calendar } from '../Calendar';

jest.mock('../SelectMonth', () => ({
  SelectMonth: ({ month, onChange }) => (
    <select
      data-testid="select-month"
      value={month}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      <option value="0">January</option>
      <option value="1">February</option>
      <option value="2">March</option>
    </select>
  ),
}));

jest.mock('../SelectYear', () => ({
  SelectYear: ({ year, onChange, years }) => (
    <select
      data-testid="select-year"
      value={year}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      {years.map((y) => (
        <option key={y} value={y}>
          {y}
        </option>
      ))}
    </select>
  ),
}));

describe('Calendar', () => {
  const mockDate = new Date(2025, 1, 15);

  test('renders correctly with default props', () => {
    render(<Calendar selectedDate={mockDate} />);
    expect(screen.getByText('February')).toBeInTheDocument();
    expect(screen.getByText('2025')).toBeInTheDocument();
  });

  test('renders days correctly', () => {
    render(<Calendar selectedDate={mockDate} />);
    expect(screen.getByText('15')).toBeInTheDocument();
  });
});
