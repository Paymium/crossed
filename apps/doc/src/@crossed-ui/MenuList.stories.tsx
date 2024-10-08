/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { MenuList } from '@crossed/ui/src/display/MenuList';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof MenuList> = {
  component: MenuList,
  subcomponents: {
    'MenuList.Item': MenuList.Item,
    'MenuList.Title': MenuList.Title,
    'MenuList.Divider': MenuList.Divider,
  },
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {},
  render: (e) => (
    <MenuList {...e}>
      <MenuList.Item>
        <MenuList.Title>Menu 1</MenuList.Title>
      </MenuList.Item>
      <MenuList.Item>
        <MenuList.Title>Menu 2</MenuList.Title>
      </MenuList.Item>
      <MenuList.Item>
        <MenuList.Title>Menu 3</MenuList.Title>
      </MenuList.Item>
      <MenuList.Divider />
      <MenuList.Item>
        <MenuList.Title color="error" weight="lg">
          Danger
        </MenuList.Title>
      </MenuList.Item>
    </MenuList>
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
