/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from '@storybook/test';

import { IconButton } from '@crossed/ui/src/buttons/IconButton';
import { Github } from '@crossed/unicons';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof IconButton> = {
  component: IconButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {},
  render: (args) => (
    <IconButton {...args}>
      <Github />
    </IconButton>
  ),
};

export default meta;
type Story = StoryObj<typeof IconButton>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
