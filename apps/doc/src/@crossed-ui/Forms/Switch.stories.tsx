/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Switch } from '@crossed/ui/src/forms/Switch';

// Configuration de la story
const meta: Meta<typeof Switch> = {
  component: Switch,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    disabled: { control: 'boolean' },
    defaultValue: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Primary: Story = {
  render: (args) => {
    return <Switch {...args} />;
  },
};

export const WithLabel: Story = {
  render: (args) => {
    return <Switch {...args}>My Label</Switch>;
  },
};

export const Disabled: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    disabled: true,
  },
};

export const DisabledOn: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    disabled: true,
    defaultValue: true,
  },
};

export const DisabledWithLabel: Story = {
  render: (args) => {
    return <Switch {...args}>My Label</Switch>;
  },
  args: { disabled: true },
};

export const DisabledOnWithLabel: Story = {
  render: (args) => {
    return <Switch {...args}>My Label</Switch>;
  },
  args: { disabled: true, defaultValue: true },
};
