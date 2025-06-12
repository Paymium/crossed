/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { YBox, Text } from '@crossed/ui';

const loremIpsum =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu";
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Text> = {
  component: Text,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    weight: {
      control: 'select',
      options: [
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        'h6',
        'h5',
        'h4',
        'h3',
        'h2',
        'h1',
      ],
    },
    size: {
      control: 'select',
      options: [
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        'h6',
        'h5',
        'h4',
        'h3',
        'h2',
        'h1',
      ],
    },
    textAlign: {
      control: 'select',
      options: [
        'auto', 'justify', 'default', 'center', 'left', 'right'
      ],
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'default',
        'info',
        'warning',
        'error',
        'success',
      ],
    },
  },
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
  args: { children: 'Text', textAlign:'center' },
};

export const Size: Story = {
  render() {
    return (
      <YBox space={'md'}>
        <YBox space={'xxs'}>
          <Text>Text standard size</Text>
          <Text>{loremIpsum}</Text>
        </YBox>
        <YBox space={'xxs'}>
          <Text size={'md'}>Text medium size</Text>
          <Text size={'md'}>{loremIpsum}</Text>
        </YBox>
        <YBox space={'xxs'}>
          <Text size={'sm'}>Text small size</Text>
          <Text size={'sm'}>{loremIpsum}</Text>
        </YBox>
      </YBox>
    );
  },
};
