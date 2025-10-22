/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { YBox, Divider } from '@crossed/ui';
import { Text } from '@crossed/ui/src/typography/Text';

const loremIpsum =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu";
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Text> = {
  component: Text,
  parameters: { layout: 'centered' },
  argTypes: {
    fontWeight: {
      control: 'select',
      options: ['regular', 'medium', 'semibold', 'bold'],
    },
    fontSize: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'warning', 'error', 'success', 'brand'],
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
  args: { children: 'Text' },
};

export const Size: Story = {
  render() {
    return (
      <YBox space={'md'}>
        <YBox space={'xxs'}>
          <Text fontSize={'xl'}>Text xlarge size</Text>
          <Text fontSize={'xl'}>{loremIpsum}</Text>
        </YBox>
        <Divider />
        <YBox space={'xxs'}>
          <Text fontSize={'lg'}>Text large size</Text>
          <Text fontSize={'lg'}>{loremIpsum}</Text>
        </YBox>
        <Divider />
        <YBox space={'xxs'}>
          <Text fontSize={'md'}>Text medium size</Text>
          <Text fontSize={'md'}>{loremIpsum}</Text>
        </YBox>
        <Divider />
        <YBox space={'xxs'}>
          <Text fontSize={'sm'}>Text small size</Text>
          <Text fontSize={'sm'}>{loremIpsum}</Text>
        </YBox>
        <Divider />
        <YBox space={'xxs'}>
          <Text fontSize={'xs'}>Text xsmall size</Text>
          <Text fontSize={'xs'}>{loremIpsum}</Text>
        </YBox>
      </YBox>
    );
  },
};

export const FontWeight: Story = {
  render() {
    return (
      <YBox space={'md'}>
        <YBox space={'xxs'}>
          <Text fontWeight={'bold'}>Text bold</Text>
          <Text fontWeight={'bold'}>{loremIpsum}</Text>
        </YBox>
        <Divider />
        <YBox space={'xxs'}>
          <Text fontWeight={'semibold'}>Text semibold</Text>
          <Text fontWeight={'semibold'}>{loremIpsum}</Text>
        </YBox>
        <Divider />
        <YBox space={'xxs'}>
          <Text fontWeight={'medium'}>Text medium size</Text>
          <Text fontWeight={'medium'}>{loremIpsum}</Text>
        </YBox>
        <Divider />
        <YBox space={'xxs'}>
          <Text fontWeight={'regular'}>Text regular size</Text>
          <Text fontWeight={'regular'}>{loremIpsum}</Text>
        </YBox>
      </YBox>
    );
  },
};

export const Color: Story = {
  render() {
    return (
      <YBox space={'md'}>
        <Text color={'primary'}>primary</Text>
        <Text color={'secondary'}>secondary</Text>
        <Text color={'tertiary'}>tertiary</Text>
        <Text color={'quaternary'}>quaternary</Text>
        <Text color={'error'}>error</Text>
        <Text color={'warning'}>warning</Text>
        <Text color={'success'}>success</Text>
        <Text color={'brand'}>brand</Text>
      </YBox>
    );
  },
};
