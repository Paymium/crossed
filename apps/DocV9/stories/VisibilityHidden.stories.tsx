/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { VisibilityHidden } from '@crossed/ui/src/other/VisibilityHidden';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof VisibilityHidden> = {
  component: VisibilityHidden,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {},
  render: (e) => (
    <VisibilityHidden {...e}>
      <div>hello</div>
    </VisibilityHidden>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Hide: Story = {
  args: {
    hide: true,
  },
};
export const NoHide: Story = {
  args: {
    hide: false,
  },
};
