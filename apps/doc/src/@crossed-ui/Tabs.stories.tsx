/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from '@storybook/test';

import { Tabs } from '@crossed/ui/src/disclosure/Tabs';
import { Text } from '@crossed/ui';
import { userEvent, waitFor, within } from '@storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Tabs> = {
  component: Tabs,
  subcomponents: {
    'Tabs.List': Tabs.List,
    'Tabs.Tab': Tabs.Tab,
    'Tabs.Tab.Text': Tabs.Tab.Text,
    'Tabs.Panel': Tabs.Panel,
    'Tabs.Indicator': Tabs.Indicator,
  },
  // parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['rounded', 'underline'],
    },
  },
  render: (e) => {
    return (
      <Tabs defaultValue="tab1" {...e}>
        <Tabs.List>
          <Tabs.Indicator />
          <Tabs.Tab value="tab1">
            <Tabs.Tab.Text>Tab 1</Tabs.Tab.Text>
          </Tabs.Tab>
          <Tabs.Tab value="tab2">
            <Tabs.Tab.Text>Tab 2</Tabs.Tab.Text>
          </Tabs.Tab>
          <Tabs.Tab value="tab3">
            <Tabs.Tab.Text>Tab 3</Tabs.Tab.Text>
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="tab1">
          <Text>Content tab 1</Text>
        </Tabs.Panel>
        <Tabs.Panel value="tab2">
          <Text>Content tab 2</Text>
        </Tabs.Panel>
        <Tabs.Panel value="tab3">
          <Text>Content tab 3</Text>
        </Tabs.Panel>
      </Tabs>
    );
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Rounded: Story = {
  args: { variant: 'rounded' },
  parameters: {
    backgrounds: {
      default: 'Primary',
    },
  },
};
export const Underline: Story = {
  args: { variant: 'underline' },
  parameters: {
    backgrounds: {
      default: 'Secondary',
    },
  },
};

export const RoundedArrow: Story = {
  ...Rounded,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(async () => {
      await userEvent.click(canvas.getByTestId('toRight'));
    });
  },
  render: (e) => {
    return (
      <Tabs defaultValue="tab1" {...e}>
        <Tabs.List>
          <Tabs.Indicator />
          <Tabs.Tab value="tab1">
            <Tabs.Tab.Text>Lorem ipsum odor amet</Tabs.Tab.Text>
          </Tabs.Tab>
          <Tabs.Tab value="tab2">
            <Tabs.Tab.Text>consectetuer adipiscing elit</Tabs.Tab.Text>
          </Tabs.Tab>
          <Tabs.Tab value="tab3">
            <Tabs.Tab.Text>magna eleifend tortor</Tabs.Tab.Text>
          </Tabs.Tab>
          <Tabs.Tab value="tab4">
            <Tabs.Tab.Text>Nec in ipsum</Tabs.Tab.Text>
          </Tabs.Tab>
          <Tabs.Tab value="tab5">
            <Tabs.Tab.Text>sapien netus</Tabs.Tab.Text>
          </Tabs.Tab>
          <Tabs.Tab value="tab6">
            <Tabs.Tab.Text>Tab 6</Tabs.Tab.Text>
          </Tabs.Tab>
          <Tabs.Tab value="tab7">
            <Tabs.Tab.Text>Tab 7</Tabs.Tab.Text>
          </Tabs.Tab>
          <Tabs.Tab value="tab8">
            <Tabs.Tab.Text>Tab 8</Tabs.Tab.Text>
          </Tabs.Tab>
          <Tabs.Tab value="tab9">
            <Tabs.Tab.Text>Tab 9</Tabs.Tab.Text>
          </Tabs.Tab>
          <Tabs.Tab value="tab10">
            <Tabs.Tab.Text>Tab 10</Tabs.Tab.Text>
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="tab1">
          <Text>Content tab 1</Text>
        </Tabs.Panel>
        <Tabs.Panel value="tab2">
          <Text>Content tab 2</Text>
        </Tabs.Panel>
        <Tabs.Panel value="tab3">
          <Text>Content tab 3</Text>
        </Tabs.Panel>
        <Tabs.Panel value="tab4">
          <Text>Content tab 4</Text>
        </Tabs.Panel>
        <Tabs.Panel value="tab5">
          <Text>Content tab 5</Text>
        </Tabs.Panel>
        <Tabs.Panel value="tab6">
          <Text>Content tab 6</Text>
        </Tabs.Panel>
        <Tabs.Panel value="tab7">
          <Text>Content tab 7</Text>
        </Tabs.Panel>
        <Tabs.Panel value="tab8">
          <Text>Content tab 8</Text>
        </Tabs.Panel>
        <Tabs.Panel value="tab9">
          <Text>Content tab 9</Text>
        </Tabs.Panel>
        <Tabs.Panel value="tab10">
          <Text>Content tab 10</Text>
        </Tabs.Panel>
      </Tabs>
    );
  },
};

export const UnderlineArrow: Story = {
  ...RoundedArrow,
  ...Underline,
};
