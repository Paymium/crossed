/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from '@storybook/test';

import { Toast } from '@crossed/ui/src/feedback/Toast';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Toast> = {
  component: Toast,
  subcomponents: {
    'Toast.Description': Toast.Description,
    'Toast.Icon': Toast.Icon,
    'Toast.Title': Toast.Title,
  },
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['info', 'error', 'success', 'warning'],
    },
    closable: { control: 'boolean' },
    space: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    },
    center: { control: 'boolean' },
  },
  render: (e) => (
    <Toast {...e}>
      <Toast.Title>Title</Toast.Title>
      <Toast.Description>Description</Toast.Description>
    </Toast>
  ),
};

export default meta;
type Story = StoryObj<typeof Toast>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    status: 'info',
    center: false,
  },
};
export const Animated: Story = {
  ...Primary,
  args: { status: 'info', center: false, duration: 4000 },
};
