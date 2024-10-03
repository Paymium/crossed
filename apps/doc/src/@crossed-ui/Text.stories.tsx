/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Text } from '@crossed/ui/src/typography/Text';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Text> = {
  title: '@crossed⁄ui/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    weight: {
      control: 'select',
      options: [
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        'h6',
        'h5',
        'h4',
        'h3',
        'h2',
        'h1',
      ],
    },
    size: {
      control: 'select',
      options: [
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        'h6',
        'h5',
        'h4',
        'h3',
        'h2',
        'h1',
      ],
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'default',
        'info',
        'warning',
        'error',
        'success',
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: { children: 'Text' },
};
