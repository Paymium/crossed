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
import { fn } from '@storybook/test';
import { Group } from '@crossed/ui';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Card> = {
  component: Card,
  subcomponents: {
    'Card.Title': Card.Title,
    'Card.Description': Card.Description,
  },
  tags: ['autodocs'],
  argTypes: {
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
    </Card>
  ),
};

export const Pressable: Story = {
  ...Primary,
  args: { pressable: true, onPress: fn() },
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
      {OtherCard.render(e, undefined)}
    </Group>
  ),
};

export const CardStat: Story = {
  ...Primary,
  render: (e) => (
    <Box>
      <Group>
        <Card>
          <Card.Title textAlign="center">00,00$</Card.Title>
          <Card.Description textAlign="center">Obtenu</Card.Description>
        </Card>
        {OtherCard.render(e, undefined)}
        {OtherCard.render(e, undefined)}
      </Group>
    </Box>
  ),
};

export const CardInCard: Story = {
  ...Primary,
  render: (e) => (
    <XBox space={'xl'}>
      <Card>
        <Card.Title textAlign="center">00,00$</Card.Title>
        <Card.Description textAlign="center">Obtenu</Card.Description>
        {OtherCard.render(e, undefined)}
      </Card>
      <Group>
        <Card>
          <Card.Title textAlign="center">00,00$</Card.Title>
          <Card.Description textAlign="center">Obtenu</Card.Description>
        </Card>
        {OtherCard.render(e, undefined)}
      </Group>
      <Card.Group>
        <Card.Header>
          <Card.Title>toto</Card.Title>
        </Card.Header>
        <Card>
          <Card.Title>toto</Card.Title>
        </Card>
        <Card.Footer>
          <Card.Title>toto</Card.Title>
        </Card.Footer>
      </Card.Group>
      <Card.Group>
        <Card.Header>
          <Card.Title>toto</Card.Title>
        </Card.Header>
        <Card>
          <Card.Title>toto</Card.Title>
        </Card>
      </Card.Group>
    </XBox>
  ),
};
