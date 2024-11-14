/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { ScrollView } from '@crossed/ui/src/other/ScrollView';
import { Text } from '@crossed/ui';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof ScrollView> = {
  component: ScrollView,
  subcomponents: {
    'ScrollView.Title': ScrollView.Title,
    'ScrollView.Footer': ScrollView.Footer,
    'ScrollView.Body': ScrollView.Body,
  },
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {},
  render: (e) => (
    <ScrollView {...e}>
      <ScrollView.Title>
        <Text>Header</Text>
      </ScrollView.Title>
      <ScrollView.Body>
        {Array.from(Array(100).keys()).map((i) => (
          <Text key={`renderscrollviewvody-${i}`}>Description {i}</Text>
        ))}
      </ScrollView.Body>
      <ScrollView.Footer>
        <Text>Footer</Text>
      </ScrollView.Footer>
    </ScrollView>
  ),
};

export default meta;
type Story = StoryObj<typeof ScrollView>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AnySticky: Story = {
  args: {
    stickyHeader: false,
    stickyFooter: false,
    style: { height: 500 },
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
    style: { height: 500 },
    stickyHeader: true,
    stickyFooter: true,
  },
};
