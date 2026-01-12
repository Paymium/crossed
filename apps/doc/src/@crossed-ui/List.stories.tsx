/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { ItemList } from '@crossed/ui/src/display/ItemList';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof ItemList> = {
  component: ItemList,
  subcomponents: {
    'List.Item': ItemList.Item,
    'List.Title': ItemList.Title,
    'List.Divider': ItemList.Divider,
  },
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {},
  render: (e) => (
    <ItemList {...e} padded={false}>
      <ItemList.Label>Main Task</ItemList.Label>
      <ItemList.Item>
        <ItemList.Title>MainTask1</ItemList.Title>
      </ItemList.Item>
      <ItemList.Item>
        <ItemList.Title>MainTask2</ItemList.Title>
      </ItemList.Item>
      <ItemList.Item>
        <ItemList.Title>MainTask3</ItemList.Title>
      </ItemList.Item>
      <ItemList.Divider />
      <ItemList.Label>Minor Task</ItemList.Label>
      <ItemList.Item>
        <ItemList.Title>MinorTask1</ItemList.Title>
      </ItemList.Item>
      <ItemList.Item>
        <ItemList.Title>MinorTask2</ItemList.Title>
      </ItemList.Item>
    </ItemList>
  ),
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
};
