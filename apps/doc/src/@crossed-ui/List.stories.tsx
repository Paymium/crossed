/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { List } from '@crossed/ui/src/display/List';
import { inlineStyle } from '@crossed/styled';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof List> = {
  component: List,
  subcomponents: {
    'List.Item': List.Item,
    'List.Title': List.Title,
    'List.Divider': List.Divider,
  },
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {},
  render: (e) => (
    <List {...e} padded={false}>
      <List.Label>Main Task</List.Label>
      <List.Item
        style={inlineStyle(() => ({
          base: { paddingVertical: 100, paddingHorizontal: 100 },
        }))}
      >
        <List.Title>MainTask1</List.Title>
      </List.Item>
      <List.Item>
        <List.Title>MainTask2</List.Title>
      </List.Item>
      <List.Item>
        <List.Title>MainTask3</List.Title>
      </List.Item>
      <List.Divider />
      <List.Label>Minor Task</List.Label>
      <List.Item>
        <List.Title>MinorTask1</List.Title>
      </List.Item>
      <List.Item>
        <List.Title>MinorTask2</List.Title>
      </List.Item>
    </List>
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
