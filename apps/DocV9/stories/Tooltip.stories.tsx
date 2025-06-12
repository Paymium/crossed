/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { YBox, Text } from '@crossed/ui';
import { Tooltip } from '@crossed/ui/src/overlay/Tooltip';
import { inlineStyle } from '@crossed/styled';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    triggerStrategy: {
      control: 'select',
      options: ['onPress', 'onPointerEnter'],
    },
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'right',
        'right-start',
        'right-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
      ],
    },
  },
  subcomponents: {
    'Tooltip.Trigger': Tooltip.Trigger,
    'Tooltip.Content': Tooltip.Content,
  },
  render({ closeOnPress, ...e }: any) {
    return (
      <YBox
        alignItems={'center'}
        justifyContent="center"
        style={inlineStyle(() => ({
          base: { width: 200, height: 200 },
        }))}
      >
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
