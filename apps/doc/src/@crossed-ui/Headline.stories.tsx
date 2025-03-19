/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Headline } from '@crossed/ui/src/typography/Heading';
import { YBox } from '@crossed/ui/src/layout/YBox';

const loremIpsum =
  'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.';
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Headline> = {
  component: Headline,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: {
      control: 'select',
      options: ['xl', 'lg', 'md'],
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'brand',
        'info',
        'warning',
        'error',
        'success',
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Headline>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  parameters: {
    docs: {
      source: { language: 'tsx' },
    },
  },
  args: { children: 'Text' },
};

export const Size: Story = {
  render() {
    return (
      <YBox space={'md'}>
        <YBox space={'xxs'}>
          <Headline>Headline xl</Headline>
          <Headline>{loremIpsum}</Headline>
        </YBox>
        <YBox space={'xxs'}>
          <Headline size={'lg'}>Headline lg</Headline>
          <Headline size={'lg'}>{loremIpsum}</Headline>
        </YBox>
        <YBox space={'xxs'}>
          <Headline size={'md'}>Headline md</Headline>
          <Headline size={'md'}>{loremIpsum}</Headline>
        </YBox>
      </YBox>
    );
  },
};
