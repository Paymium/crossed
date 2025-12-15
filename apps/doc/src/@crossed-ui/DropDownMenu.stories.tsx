/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { YBox, Button, Card } from '@crossed/ui';
import { DropDownMenu } from '@crossed/ui/src/display/DropDownMenu';
import { inlineStyle } from '@crossed/styled';

const meta: Meta<typeof DropDownMenu> = {
  component: DropDownMenu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {},
  render({ ...e }: any) {
    return (
      <YBox
        alignItems={'center'}
        justifyContent="start"
        style={inlineStyle(() => ({
          base: { width: 200, height: 600 },
        }))}
      >
        <DropDownMenu {...e}>
          <DropDownMenu.Trigger asChild>
            <Button>
              <Button.Text>Menu</Button.Text>
              <Button.Icon />
            </Button>
          </DropDownMenu.Trigger>
          <DropDownMenu.Content>
            <DropDownMenu.Item>
              <DropDownMenu.Title>Action1</DropDownMenu.Title>
            </DropDownMenu.Item>

            <DropDownMenu.Item>
              <DropDownMenu.Title>Action2</DropDownMenu.Title>
            </DropDownMenu.Item>
            <DropDownMenu.Item>
              <DropDownMenu.Title>Action3</DropDownMenu.Title>
            </DropDownMenu.Item>
          </DropDownMenu.Content>
        </DropDownMenu>
      </YBox>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};

export const WithLabel: Story = {
  render({ ...e }: any) {
    return (
      <YBox
        alignItems={'center'}
        justifyContent="start"
        style={inlineStyle(() => ({
          base: { width: 200, height: 600 },
        }))}
      >
        <DropDownMenu {...e}>
          <DropDownMenu.Trigger asChild>
            <Button>
              <Button.Text>Menu</Button.Text>
              <Button.Icon />
            </Button>
          </DropDownMenu.Trigger>
          <DropDownMenu.Content>
            <DropDownMenu.Label>Action</DropDownMenu.Label>
            <DropDownMenu.Divider />
            <DropDownMenu.Item>
              <DropDownMenu.Title>Action 1</DropDownMenu.Title>
            </DropDownMenu.Item>
            <DropDownMenu.Item>
              <DropDownMenu.Title>Action 2</DropDownMenu.Title>
            </DropDownMenu.Item>
            <DropDownMenu.Item>
              <DropDownMenu.Title>Action 3</DropDownMenu.Title>
            </DropDownMenu.Item>
            <DropDownMenu.Label>Link</DropDownMenu.Label>
            <DropDownMenu.Divider />
            <DropDownMenu.Item>
              <DropDownMenu.Title>link 1</DropDownMenu.Title>
            </DropDownMenu.Item>
            <DropDownMenu.Item>
              <DropDownMenu.Title>Link 2</DropDownMenu.Title>
            </DropDownMenu.Item>
            <DropDownMenu.Item>
              <DropDownMenu.Title>Link 3</DropDownMenu.Title>
            </DropDownMenu.Item>
          </DropDownMenu.Content>
        </DropDownMenu>
      </YBox>
    );
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithComponent: Story = {
  render({ ...e }: any) {
    return (
      <YBox
        alignItems={'center'}
        justifyContent="start"
        style={inlineStyle(() => ({
          base: { width: 200, height: 600 },
        }))}
      >
        <DropDownMenu {...e}>
          <DropDownMenu.Trigger asChild>
            <Button>
              <Button.Text>Menu</Button.Text>
              <Button.Icon />
            </Button>
          </DropDownMenu.Trigger>
          <DropDownMenu.Content>
            <Card size={'xs'}>
              <Card.Title>Your Profile</Card.Title>
              <Card.Description>Find here all your info</Card.Description>
            </Card>
            <DropDownMenu.Divider />
            <DropDownMenu.Label>Action</DropDownMenu.Label>
            <DropDownMenu.Item>
              <DropDownMenu.Title>Action1</DropDownMenu.Title>
            </DropDownMenu.Item>
            <DropDownMenu.Item>
              <DropDownMenu.Title>Action2</DropDownMenu.Title>
            </DropDownMenu.Item>
            <DropDownMenu.Item>
              <DropDownMenu.Title>Action3</DropDownMenu.Title>
            </DropDownMenu.Item>
            <DropDownMenu.Divider />
            <Button variant={'tertiary'}>
              <Button.Text color={'error'}>Disconect</Button.Text>
            </Button>
          </DropDownMenu.Content>
        </DropDownMenu>
      </YBox>
    );
  },
};
