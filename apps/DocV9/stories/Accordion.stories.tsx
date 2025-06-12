/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Accordion } from '@crossed/ui/src/disclosure/Accordion';
import { Box, Text, YBox } from '@crossed/ui';
import { ComponentType } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Accordion> = {
  component: Accordion,
  subcomponents: {
    'Accordion.Item': Accordion.Item as ComponentType<any>,
    'Accordion.Icon': Accordion.Icon as ComponentType<any>,
    'Accordion.Trigger': Accordion.Trigger as ComponentType<any>,
    'Accordion.Panel': Accordion.Panel as ComponentType<any>,
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
            <YBox>
              <Text>Content 2</Text>
              <Text>Content 2</Text>
              <Text>Content 2</Text>
              <Text>Content 2</Text>
            </YBox>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="3">
          <Accordion.Trigger>
            <Text>Title 3</Text>
            <Accordion.Icon />
          </Accordion.Trigger>
          <Accordion.Panel>
            <YBox>
              <Text>Content 3</Text>
              <Text>Content 3</Text>
            </YBox>
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
