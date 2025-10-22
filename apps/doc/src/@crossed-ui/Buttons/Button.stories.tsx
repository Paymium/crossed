/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@crossed/ui/src/buttons/Button';
import { XBox, YBox, Group as GroupCrossed } from '@crossed/ui';
import { Check } from '@crossed/icons';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Button> = {
  component: Button,
  subcomponents: {
    'Button.Text': Button.Text,
    'Button.Element': Button.Element,
    'Button.Group': Button.Group,
    'Button.Icon': Button.Icon,
    'Button.Preset': Button.Preset,
  },
  // tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Ke8D4tdGD8lCjNYY5NO33R/Design-system?node-id=3-299&t=2ZiT8Ks6ZLwLW9X6-4',
    },
    docs: { description: { component: 'Button component' } },
  },
  render(e) {
    return (
      <Button {...e}>
        <Button.Text>Button</Button.Text>
      </Button>
    );
  },
  args: { variant: 'primary', loading: false, disabled: false },
  argTypes: {
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'error'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'false'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Loading: Story = {
  args: { variant: 'primary', loading: true, disabled: false },
  render: (args) => (
    <Button {...args}>
      <Button.Text>Loading</Button.Text>
    </Button>
  ),
};
export const WithIcon: Story = {
  args: { variant: 'primary', loading: false, disabled: false },
  render: (args) => (
    <Button {...args}>
      <Button.Icon>
        <Check />
      </Button.Icon>
      <Button.Text>With icon</Button.Text>
    </Button>
  ),
};
export const Size: Story = {
  render() {
    return (
      <XBox space={'xs'} alignItems={'center'}>
        <Button variant={'primary'} size={'sm'}>
          <Button.Text>Primary</Button.Text>
        </Button>
        <Button variant={'primary'} size={'md'}>
          <Button.Text>Primary</Button.Text>
        </Button>
        <Button variant={'primary'} size={'lg'}>
          <Button.Text>Primary</Button.Text>
        </Button>
        <Button variant={'primary'} size={'xl'}>
          <Button.Text>Primary</Button.Text>
        </Button>
      </XBox>
    );
  },
};
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Variant: Story = {
  render() {
    return (
      <YBox space={'xs'}>
        <XBox space={'xs'}>
          <Button variant={'primary'}>
            <Button.Text>Primary</Button.Text>
          </Button>
          <Button variant={'primary'} disabled>
            <Button.Text>Primary</Button.Text>
          </Button>
          <Button variant={'primary'} loading>
            <Button.Text>Primary</Button.Text>
          </Button>
        </XBox>
        <XBox space={'xs'}>
          <Button variant={'secondary'}>
            <Button.Text>Secondary</Button.Text>
          </Button>
          <Button variant={'secondary'} disabled>
            <Button.Text>Secondary</Button.Text>
          </Button>
          <Button variant={'secondary'} loading>
            <Button.Text>Secondary</Button.Text>
          </Button>
        </XBox>
        <XBox space={'xs'}>
          <Button variant={'tertiary'}>
            <Button.Text>Tertiary</Button.Text>
          </Button>
          <Button variant={'tertiary'} disabled>
            <Button.Text>Tertiary</Button.Text>
          </Button>
          <Button variant={'tertiary'} loading>
            <Button.Text>Tertiary</Button.Text>
          </Button>
        </XBox>
        <XBox space={'xs'}>
          <Button variant={'primary'} error>
            <Button.Text>Primary error</Button.Text>
          </Button>
          <Button variant={'primary'} disabled error>
            <Button.Text>Primary error</Button.Text>
          </Button>
          <Button variant={'primary'} loading error>
            <Button.Text>Primary error</Button.Text>
          </Button>
        </XBox>
        <XBox space={'xs'}>
          <Button variant={'secondary'} error>
            <Button.Text>Secondary error</Button.Text>
          </Button>
          <Button variant={'secondary'} disabled error>
            <Button.Text>Secondary error</Button.Text>
          </Button>
          <Button variant={'secondary'} loading error>
            <Button.Text>Secondary error</Button.Text>
          </Button>
        </XBox>
        <XBox space={'xs'}>
          <Button variant={'tertiary'} error>
            <Button.Text>Tertiary error</Button.Text>
          </Button>
          <Button variant={'tertiary'} disabled error>
            <Button.Text>Tertiary error</Button.Text>
          </Button>
          <Button variant={'tertiary'} loading error>
            <Button.Text>Tertiary error</Button.Text>
          </Button>
        </XBox>
        <XBox space={'xs'}>
          <Button variant={'primary'} success>
            <Button.Text>Primary success</Button.Text>
          </Button>
          <Button variant={'primary'} disabled success>
            <Button.Text>Primary success</Button.Text>
          </Button>
          <Button variant={'primary'} loading success>
            <Button.Text>Primary success</Button.Text>
          </Button>
        </XBox>
      </YBox>
    );
  },
};
export const Primary: Story = {
  args: { variant: 'primary', loading: false, disabled: false },
  render(e) {
    return (
      <Button {...e}>
        <Button.Text>Button</Button.Text>
      </Button>
    );
  },
};
export const Secondary: Story = {
  args: { ...Primary.args, variant: 'secondary' },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Ke8D4tdGD8lCjNYY5NO33R/Design-system?node-id=3-317&t=2ZiT8Ks6ZLwLW9X6-4',
    },
  },
};
export const Tertiary: Story = {
  args: { ...Primary.args, variant: 'tertiary' },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Ke8D4tdGD8lCjNYY5NO33R/Design-system?node-id=3-301&t=2ZiT8Ks6ZLwLW9X6-4',
    },
  },
};

export const Success: Story = {
  args: { ...Primary.args, variant: 'primary', success: true },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Ke8D4tdGD8lCjNYY5NO33R/Design-system?node-id=3-301&t=2ZiT8Ks6ZLwLW9X6-4',
    },
  },
};

export const Error: Story = {
  args: { ...Primary.args, variant: 'primary', error: true },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Ke8D4tdGD8lCjNYY5NO33R/Design-system?node-id=3-301&t=2ZiT8Ks6ZLwLW9X6-4',
    },
  },
};
export const Group: Story = {
  args: { variant: 'primary', loading: false, disabled: false },
  render(e) {
    return (
      <GroupCrossed orientation={'horizontal'}>
        <Button {...e}>
          <Button.Text>Button</Button.Text>
        </Button>
        <Button {...e}>
          <Button.Text>Button</Button.Text>
        </Button>
        <Button {...e}>
          <Button.Text>Button</Button.Text>
        </Button>
        <Button {...e}>
          <Button.Text>Button</Button.Text>
        </Button>
      </GroupCrossed>
    );
  },
};
export const Preset: Story = {
  args: { variant: 'primary', loading: false, disabled: false },
  render(e) {
    return (
      <Button.Preset
        {...e}
        text={'my button'}
        iconLeft={<Check />}
        iconRight={<Check />}
      />
    );
  },
};
