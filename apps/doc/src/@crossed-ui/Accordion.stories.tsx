/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Accordion } from '@crossed/ui/src/disclosure/Accordion';
import { Box, Text } from '@crossed/ui';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Accordion> = {
  component: Accordion,
  subcomponents: {
    'Accordion.Item': Accordion.Item,
    'Accordion.Icon': Accordion.Icon,
    'Accordion.Trigger': Accordion.Trigger,
    'Accordion.Panel': Accordion.Panel,
  },
  tags: ['autodocs'],
  argTypes: {
    allowMultiple: { control: 'boolean' },
  },
  render: (e) => (
    <Box>
      <Accordion {...e}>
        <Accordion.Item value="1">
          <Accordion.Trigger>
            <Text>Title 1</Text>
            <Accordion.Icon />
          </Accordion.Trigger>
          <Accordion.Panel>
            <Text>Content 1</Text>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="2">
          <Accordion.Trigger>
            <Text>Title 2</Text>
            <Accordion.Icon />
          </Accordion.Trigger>
          <Accordion.Panel>
            <Text>Content 2</Text>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="3">
          <Accordion.Trigger>
            <Text>Title 3</Text>
            <Accordion.Icon />
          </Accordion.Trigger>
          <Accordion.Panel>
            <Text>Content 3</Text>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="4">
          <Accordion.Trigger>
            <Text>Title 4</Text>
            <Accordion.Icon />
          </Accordion.Trigger>
          <Accordion.Panel>
            <Text>Content 4</Text>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Box>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Info: Story = {
  args: { defaultValues: [] },
};
