/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '@crossed/ui/src/forms/Checkbox';
import { fn } from '@storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    checked: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
  },
  args: { onChecked: fn() },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Primary: Story = {
  args: {
    children: 'My label',
  },
};

export const DefaultChecked: Story = {
  args: {
    ...Primary.args,
    defaultChecked: true,
  },
};
