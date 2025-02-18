/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { render, fireEvent, screen } from '@crossed/test';
import { SelectYear } from '../SelectYear';

jest.mock('../../Select', () => ({
  Select: ({ value, onChange, items }: any) => (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {items.map((item: any) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  ),
}));

describe('SelectYear', () => {
  const mockYears = [2020, 2021, 2022, 2023, 2024];
  const mockOnChange = jest.fn();

  test('renders correctly with given years and selected year', () => {
    render(
      <SelectYear year={2022} years={mockYears} onChange={mockOnChange} />
    );
    expect(screen.getByDisplayValue('2022')).toBeInTheDocument();
  });

  test('calls onChange when a new year is selected', () => {
    render(
      <SelectYear year={2022} years={mockYears} onChange={mockOnChange} />
    );

    fireEvent.change(screen.getByDisplayValue('2022'), {
      target: { value: '2023' },
    });
    expect(mockOnChange).toHaveBeenCalledWith(2023);
  });

  test('renders all years in the dropdown', () => {
    render(
      <SelectYear year={2022} years={mockYears} onChange={mockOnChange} />
    );

    mockYears.forEach((year) => {
      expect(screen.getByText(`${year}`)).toBeInTheDocument();
    });
  });
});
