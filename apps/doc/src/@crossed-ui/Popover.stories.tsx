/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Popover } from '@crossed/ui/src/overlay/popover';
import { Text, YBox } from '@crossed/ui';
import { inlineStyle } from '@crossed/styled';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Popover> = {
  component: Popover,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  render: (e) => (
    <YBox
      alignItems={'center'}
      justifyContent="start"
      style={inlineStyle(() => ({
        base: { width: 200, height: 400 },
      }))}
    >
      <Popover {...e}>
        <Popover.Trigger>
          <Text>Click to open</Text>
        </Popover.Trigger>
        <Popover.Content>
          <Text>Now you see mee</Text>
        </Popover.Content>
      </Popover>
    </YBox>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
