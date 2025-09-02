/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Pagination } from '@crossed/ui/src/Buttons/Pagination';
import { fn } from '@storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Pagination> = {
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    center: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: { center: false, onPress: fn() },
  render: () => <Pagination pageCount={10} currentPageNumber={1} />,
};
