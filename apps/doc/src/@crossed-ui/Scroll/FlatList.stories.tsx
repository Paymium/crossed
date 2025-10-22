/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { FlatList } from '@crossed/ui';
import { Text } from '@crossed/ui';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof FlatList> = {
  component: FlatList,
  tags: ['autodocs'],
  argTypes: {},
  render: (e) => <FlatList {...e} />,
};

export default meta;
type Story = StoryObj<typeof FlatList>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AnySticky: Story = {
  args: {
    stickyHeader: false,
    stickyFooter: false,
    animatedStyle: { height: 500 },
    data: Array.from(Array(100).keys()),
    renderItem: ({ item }) => <Text>{item}</Text>,
    title: <Text>Title</Text>,
    footer: <Text>footer</Text>,
  },
};
export const StickyHeader: Story = {
  ...AnySticky,
  args: { ...AnySticky.args, stickyHeader: true },
};
export const StickyFooter: Story = {
  ...AnySticky,
  args: { ...AnySticky.args, stickyFooter: true },
};
export const StickyHeaderFooter: Story = {
  ...AnySticky,
  args: {
    ...AnySticky.args,
    stickyHeader: true,
    stickyFooter: true,
  },
};
