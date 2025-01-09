/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Card } from '@crossed/ui/src/display/Card';
import { XBox } from '@crossed/ui/src/layout/XBox';
import { Text } from '@crossed/ui/src/typography/Text';
import { Divider } from '@crossed/ui/src/layout/Divider';
import { Box } from '@crossed/ui/src/layout/Box';
import { inlineStyle } from '@crossed/styled';
import { fn } from '@storybook/test';
import { Group } from '@crossed/ui';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Card> = {
  component: Card,
  subcomponents: {
    'Card.Title': Card.Title,
    'Card.Description': Card.Description,
    'Card.Extra': Card.Extra,
  },
  tags: ['autodocs'],
  argTypes: {
    space: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', null],
    },
    center: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: { center: false, onPress: fn() },
  render: (e) => (
    <Card {...e}>
      <Card.Title>This is a Title</Card.Title>
      <Card.Description>This is a Description for your card</Card.Description>
      <Card.Extra>This is a litle Extra</Card.Extra>
    </Card>
  ),
};

export const Pressable: Story = {
  ...Primary,
  args: { pressable: true, onPress: fn() },
};

export const SizeXs: Story = {
  ...Primary,
  args: { size: 'xs' },
};
export const SizeSm: Story = {
  ...Primary,
  args: { size: 'sm' },
};
export const SizeMd: Story = {
  ...Primary,
  args: { size: 'md' },
};
export const SizeLg: Story = {
  ...Primary,
  args: { size: 'lg' },
};

export const OtherCard: Story = {
  ...Primary,
  render: (e) => (
    <Card {...e}>
      <XBox justifyContent="between" space="sm">
        <Text>Label</Text>
        <Text>Value</Text>
      </XBox>
    </Card>
  ),
};

export const OneElement: Story = {
  ...Primary,
  render: (e) => (
    <Group>
      {Primary.render(e, undefined)}
      <Divider />
      {OtherCard.render(e, undefined)}
    </Group>
  ),
};

export const CardStat: Story = {
  ...Primary,
  render: (e) => (
    <Box
      style={inlineStyle(() => ({
        base: { width: '100%' },
        media: { md: { width: '25%' } },
      }))}
    >
      <Group>
        <Card>
          <Card.Title textAlign="center">00,00$</Card.Title>
          <Card.Description textAlign="center">Obtenu</Card.Description>
        </Card>
        <Divider />
        {OtherCard.render(e, undefined)}
        <Divider />
        {OtherCard.render(e, undefined)}
      </Group>
    </Box>
  ),
};
