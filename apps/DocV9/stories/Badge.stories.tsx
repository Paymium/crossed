/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from '@crossed/ui/src/display/Badge';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Badge> = {
  component: Badge,
  render(e) {
    return (
      <>
        <Badge {...e}>
          <Badge.Text>Badge</Badge.Text>
        </Badge>
        <Badge {...e} variant={'success'}>
          <Badge.Text>Badge</Badge.Text>
        </Badge>
        <Badge {...e} variant={'error'}>
          <Badge.Text>Badge</Badge.Text>
        </Badge>
        <Badge {...e} variant={'warning'}>
          <Badge.Text>Badge</Badge.Text>
        </Badge>
        <Badge {...e} variant={'info'}>
          <Badge.Text>Badge</Badge.Text>
        </Badge>
      </>
    );
  },
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Text>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  parameters: {
    docs: {
      source: { language: 'tsx' },
    },
  },
  args: {},
};
