/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Alert, AlertDescription } from '@crossed/ui/src/feedback/Alert';
import { CloseButton, XBox, Anchor } from '@crossed/ui';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Alert> = {
  component: Alert,
  subcomponents: {
    'Alert.Description': AlertDescription,
    'Alert.Icon': Alert.Icon,
    'Alert.Title': Alert.Title,
    'Alert.Group': Alert.Group,
    'Alert.Preset': Alert.Preset,
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['info', 'error', 'success', 'warning', 'brand'],
    },
    space: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    },
    rounded: { control: 'boolean' },
    center: { control: 'boolean' },
  },
  render: (e) => (
    <Alert {...e}>
      <Alert.Icon />
      <Alert.Group space={'xl'}>
        <Alert.Group>
          <Alert.Title>We’ve just released a new feature</Alert.Title>
          <Alert.Description>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            pariatur, ipsum dolor.
          </Alert.Description>
        </Alert.Group>
        <XBox space={'xl'}>
          <Anchor primary={false} fontSize={'sm'}>
            Dismiss
          </Anchor>
          <Anchor fontSize={'sm'}>View changes</Anchor>
        </XBox>
      </Alert.Group>
      <CloseButton />
    </Alert>
  ),
};

export default meta;
type Story = StoryObj<typeof Alert>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Info: Story = {
  args: { status: 'info', center: false },
};
export const Rounded: Story = {
  args: { status: 'info', rounded: true },
};
export const Success: Story = {
  ...Info,
  args: { ...Info.args, status: 'success' },
};
export const Warning: Story = {
  ...Info,
  args: { ...Info.args, status: 'warning' },
};
export const Error: Story = {
  ...Info,
  args: { ...Info.args, status: 'error' },
};

export const Brand: Story = {
  ...Info,
  args: { ...Info.args, status: 'brand' },
};

export const Group: Story = {
  ...Info,
  render: (e) => (
    <Alert {...e}>
      <Alert.Icon />
      <Alert.Group>
        <Alert.Description>Description</Alert.Description>

        <Alert.Description>Description</Alert.Description>
      </Alert.Group>
    </Alert>
  ),
};

export const Preset: Story = {
  ...Info,
  render: (e) => (
    <Alert.Preset
      {...e}
      title={'We’ve just released a new feature'}
      description={
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor.'
      }
      actions={
        <>
          <Anchor primary={false} fontSize={'sm'}>
            Dismiss
          </Anchor>
          <Anchor fontSize={'sm'}>View changes</Anchor>
        </>
      }
    />
  ),
};
