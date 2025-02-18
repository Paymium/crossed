/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { render, screen } from '@crossed/test';
import { WeekDay } from '../WeekDay';
import { IDay } from '@crossed/use-calendar/src';

describe('WeekDay', () => {
  const mockDays: IDay[] = [
    { date: new Date(2024, 0, 1) }, // January 1st
    { date: new Date(2024, 0, 2) }, // January 2nd
    { date: new Date(2024, 0, 3) }, // January 3rd
  ];

  test('renders correctly with given days and locale', () => {
    render(<WeekDay days={mockDays} locale="en" />);

    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Tue')).toBeInTheDocument();
    expect(screen.getByText('Wed')).toBeInTheDocument();
  });

  test('renders with a different locale', () => {
    render(<WeekDay days={mockDays} locale="fr" />);

    expect(screen.getByText('Lun.')).toBeInTheDocument();
    expect(screen.getByText('Mar.')).toBeInTheDocument();
    expect(screen.getByText('Mer.')).toBeInTheDocument();
  });

  test('applies custom styles', () => {
    render(<WeekDay days={mockDays} locale="en" />);
    const elements = screen.getAllByText(/Mon|Tue|Wed/);
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
});
