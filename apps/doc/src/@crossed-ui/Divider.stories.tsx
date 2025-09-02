/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Divider } from '@crossed/ui/src/layout/Divider';
import { Center, XBox, Box } from '@crossed/ui';
import { fn } from '@storybook/test';
import { inlineStyle } from '@crossed/styled';

const style = inlineStyle(() => ({ base: { height: 50 } }));
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Divider> = {
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    center: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Primary: Story = {
  args: { center: false, onPress: fn() },
  render: () => {
    return (
      <Box space={'xl'}>
        <Divider />
        <Divider color={'secondary'} />
        <XBox style={style} justifyContent={'center'} space={'xl'}>
          <Divider direction={'vertical'} />
          <Divider direction={'vertical'} color={'secondary'} />
        </XBox>
      </Box>
    );
  },
};

export const Horizontal: Story = {
  args: { center: false, onPress: fn() },
  render: () => {
    return (
      <Center style={style}>
        <Divider />
      </Center>
    );
  },
};

export const Vertical: Story = {
  args: { center: false, onPress: fn() },
  render: () => {
    return (
      <Center style={style}>
        <Divider direction={'vertical'} />
      </Center>
    );
  },
};
