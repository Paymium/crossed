/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Group } from '@crossed/ui/src/display/Group';
import { Divider } from '@crossed/ui';
import { Card } from '@crossed/ui';
import { Button } from '@crossed/ui';

const ButtonCustom = (props) => (
  <Button {...props}>
    <Button.Text>Custom Button</Button.Text>
  </Button>
);
const CardCustom = (props) => (
  <Card {...props}>
    <Card.Title>Custom Card</Card.Title>
  </Card>
);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Group> = {
  component: Group,
  parameters: { layout: 'centered' },
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
};

export default meta;
type Story = StoryObj<typeof Group>;

export const WithButton: Story = {
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
  } as any,
  render({ variant, ...e }: any) {
    return (
      <Group {...e}>
        <ButtonCustom variant={variant} />
        <Divider />
        <ButtonCustom variant={variant} />
      </Group>
    );
  },
};
export const WithCard: Story = {
  render(e) {
    return (
      <Group {...e}>
        <CardCustom />
        <Divider color={'secondary'} />
        <CardCustom />
      </Group>
    );
  },
};
