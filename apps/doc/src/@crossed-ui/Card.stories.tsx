/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Card } from '@crossed/ui/src/display/Card';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Card> = {
  component: Card,
  subcomponents: {
    'Card.Description': Card.Description,
    'Card.Extra': Card.Extra,
    'Card.Title': Card.Title,
  },
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  render: (e) => (
    <Card {...e}>
      <Card.Title>This is a title</Card.Title>
      <Card.Description>This is the Description of your card </Card.Description>
      <Card.Extra>This is a litle extra</Card.Extra>
    </Card>
  ),
};

export default meta;
type Story = StoryObj<typeof Card>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  parameters: {
    docs: {
      source: { language: 'tsx' },
    },
  },
};
