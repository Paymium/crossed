/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Progress } from '@crossed/ui/src/feedback/Progress';
import { ComponentProps } from 'react';

const Render = (e: ComponentProps<typeof Progress>) => <Progress {...e} />;
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Progress> = {
  component: Progress,
  argTypes: {},
  render: (e) => <Render {...e} />,
};

export default meta;
type Story = StoryObj<typeof Progress>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Value: Story = {
  args: {
    value: 73,
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const ShowPercent: Story = {
  args: {
    value: 73,
    showPercent: true,
  },
};
