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
    'Toast.Progress': Toast.Progress,
    'Toast.Preset': Toast.Preset,
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
      <Toast.Title>This is a Toast </Toast.Title>
      <Toast.Description>This is its description</Toast.Description>
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
  render: (e) => (
    <Toast {...e}>
      <Toast.Title>Animated Toast</Toast.Title>
      <Toast.Description>Indicating when the toast will disapear</Toast.Description>
      <Toast.Progress duration={4000} />
    </Toast>
  ),
  args: { status: 'info', center: false, duration: 4000 },
};

export const Preset: Story = {
  render: (e) => (
    <Toast.Preset
      {...e}
      title="I'm a Toast"
      description="This is a pre-configurated Toast you can use directly"
      status={'success'}
      duration={4000}
    />
  ),
};
