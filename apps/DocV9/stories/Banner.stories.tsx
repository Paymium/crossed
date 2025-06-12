/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from '@storybook/test';

import { Banner, BannerActionText } from '@crossed/ui/src/feedback/Banner';
import { ComponentType } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Banner> = {
  component: Banner,
  subcomponents: {
    'Banner.Description': Banner.Description as ComponentType<any>,
    'Banner.Icon': Banner.Icon as ComponentType<any>,
    'Banner.Title': Banner.Title as ComponentType<any>,
    'Banner.Action': Banner.Action as ComponentType<any>,
    'Banner.Action.Text': BannerActionText as ComponentType<any>,
  },
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['info', 'error', 'success', 'warning'],
    },
    space: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    },
    center: { control: 'boolean' },
  },
  render: (e) => (
    <Banner {...e}>
      <Banner.Icon />
      <Banner.Title>Description</Banner.Title>
    </Banner>
  ),
};

export default meta;
type Story = StoryObj<typeof Banner>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    status: 'info',
    center: false,
  },
};
