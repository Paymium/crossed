/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Calendar } from '@crossed/ui/src/forms/Calendar';

const date = new Date();
const first = new Date(date);
const last = new Date(date);
first.setFullYear(date.getFullYear() - 50);
last.setFullYear(date.getFullYear() + 50);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Calendar> = {
  component: Calendar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    locale: { control: 'radio', options: ['en', 'fr', 'default'] },
  },
  args: {
    firstDayOfWeek: 1,
    minDate: first,
    maxDate: last,
    monthsToDisplay: 1,
    onDateSelected: fn(),
    // selectedDate: date,
    locale: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
