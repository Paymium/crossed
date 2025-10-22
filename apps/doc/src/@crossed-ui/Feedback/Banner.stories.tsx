/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Banner } from '@crossed/ui/src/feedback/Banner';
import { YBox, growStyles, Input, CloseButton, Button } from '@crossed/ui';
import { Announcement1 } from '@crossed/icons';
import { ComponentProps } from 'react';

const Render = (e: ComponentProps<typeof Banner>) => (
  <Banner {...e}>
    <Banner.Icon>
      <Announcement1 />
    </Banner.Icon>
    <YBox style={growStyles.on}>
      <Banner.Title>
        Stay up to date with the latest news and updates
      </Banner.Title>
      <Banner.Description>
        Lorem ipsum dolor sit amet consectetur odio nunc adipiscing viverra.
      </Banner.Description>
    </YBox>
    <Input placeholder={'Enter your email'} />
    <Button>
      <Button.Text>Allow</Button.Text>
    </Button>
    <CloseButton />
  </Banner>
);
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Banner> = {
  component: Banner,
  subcomponents: {
    'Banner.Description': Banner.Description,
    'Banner.Icon': Banner.Icon,
    'Banner.Title': Banner.Title,
    'Banner.Preset': Banner.Preset,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'brand'],
    },
    space: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    },
    center: { control: 'boolean' },
  },
  render: (e) => (
    <YBox space={'md'}>
      <Render {...e} />
      <Render {...e} variant={'brand'} />
      <Render floating {...e} />
      <Render floating {...e} variant={'brand'} />
    </YBox>
  ),
};

export default meta;
type Story = StoryObj<typeof Banner>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 'default',
    center: false,
  },
};

type StoryPreset = StoryObj<typeof Banner.Preset>;
export const Preset: StoryPreset = {
  args: {
    variant: 'default',
    floating: false,
    center: false,
    icon: <Announcement1 />,
    actions: (
      <>
        <Button variant={'secondary'}>
          <Button.Text>Decline</Button.Text>
        </Button>
        <Button>
          <Button.Text>Allow</Button.Text>
        </Button>
      </>
    ),
    title: 'Stay up to date with the latest news and updates',
    description:
      'Lorem ipsum dolor sit amet consectetur odio nunc adipiscing viverra.',
  },
  render: (e) => (
    <YBox space={'md'}>
      <Banner.Preset {...e} />
      <Banner.Preset {...e} onClose={() => {}} />
    </YBox>
  ),
};
