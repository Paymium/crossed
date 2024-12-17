/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { YBox, Text } from '@crossed/ui';
import { Tooltip } from 'packages/ui/src/overlay/Tooltip';
import { inlineStyle } from '@crossed/styled';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  subcomponents: {
    'Tooltip.Trigger': Tooltip.Trigger,
    'Tooltip.Content': Tooltip.Content,
  },
  render({ closeOnPress, ...e }: any) {
    return (
      <YBox style={inlineStyle(() => ({ base: { padding: 100 } }))}>
        <Tooltip {...e}>
          <Tooltip.Trigger>
            <Text>Button</Text>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <Tooltip.Text>Hello world</Tooltip.Text>
          </Tooltip.Content>
        </Tooltip>
      </YBox>
    );
  },
  argTypes: {
    visibilityHidden: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: { triggerStrategy: 'onPress' },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Hover: Story = {
  args: { triggerStrategy: 'onPointerEnter' },
};
