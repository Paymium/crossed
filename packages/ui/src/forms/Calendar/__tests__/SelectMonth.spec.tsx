/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { render, fireEvent, screen } from '@crossed/test';
import { SelectMonth } from '../SelectMonth';

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

describe('SelectMonth', () => {
  const mockMonths = [
    { value: '0', label: 'January' },
    { value: '1', label: 'February' },
    { value: '2', label: 'March' },
  ];
  const mockOnChange = jest.fn();

  test('renders correctly with given months and selected month', () => {
    render(
      <SelectMonth month={1} months={mockMonths} onChange={mockOnChange} />
    );
    expect(screen.getByDisplayValue('February')).toBeInTheDocument();
  });

  test('calls onChange when a new month is selected', () => {
    render(
      <SelectMonth month={1} months={mockMonths} onChange={mockOnChange} />
    );

    fireEvent.change(screen.getByDisplayValue('February'), {
      target: { value: '2' },
    });
    expect(mockOnChange).toHaveBeenCalledWith(2);
  });

  test('renders all months in the dropdown', () => {
    render(
      <SelectMonth month={1} months={mockMonths} onChange={mockOnChange} />
    );

    mockMonths.forEach((month) => {
      expect(screen.getByText(month.label)).toBeInTheDocument();
    });
  });
});
