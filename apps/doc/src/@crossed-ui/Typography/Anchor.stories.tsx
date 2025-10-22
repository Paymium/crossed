/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Anchor } from '@crossed/ui';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Anchor> = {
  component: Anchor,
  parameters: { layout: 'centered' },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: { children: 'Text' },
};

export const NoPrimary: Story = {
  ...Primary,
  args: { ...Primary.args, primary: false },
};
