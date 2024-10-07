/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Alert } from '@crossed/ui/src/feedback/Alert';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Alert> = {
  component: Alert,
  subcomponents: {
    'Alert.Description': Alert.Description,
    'Alert.Icon': Alert.Icon,
    'Alert.Group': Alert.Group,
    'Alert.Action': Alert.Action,
    'Alert.Action.Text': Alert.Action.Text,
  },
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['info', 'error', 'success', 'warning'],
    },
    space: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    },
    center: { control: 'boolean' },
  },
  render: (e) => (
    <Alert {...e}>
      <Alert.Icon />
      <Alert.Description>Description</Alert.Description>
    </Alert>
  ),
};

export default meta;
type Story = StoryObj<typeof Alert>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    status: 'info',
    center: false,
  },
};
