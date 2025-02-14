/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { DateInput } from '@crossed/ui/src/forms/DateInput';
// import { Text } from '@crossed/ui';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof DateInput> = {
  component: DateInput,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    locale: { control: 'select', options: ['default', 'en', 'fr'] },
    format: { control: 'text', value: 'yyyy-mm-dd' },
  },
  args: { locale: 'default', onChange: fn() },
};

export default meta;
type Story = StoryObj<typeof DateInput>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = { args: {} };

export const WithPlaceholder: Story = {
  args: {
    placeholder: { day: 'day (dd)', month: 'month (mm)', year: 'year (yyyy)' },
  },
};
export const WithPicker: Story = { args: { picker: true } };
export const WithValue: Story = { args: { value: new Date() } };
export const OnlyYearMonth: Story = { args: { format: 'yyyy-mm' } };
