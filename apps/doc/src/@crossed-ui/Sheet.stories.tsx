/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Button, Input, Sheet, Text, YBox } from '@crossed/ui';
import { inlineStyle } from '@crossed/styled';

const meta: Meta<typeof Sheet> = {
  component: Sheet,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  subcomponents: {
    'Sheet.Trigger': Sheet.Trigger,
    'Sheet.Frame': Sheet.Frame,
    'Sheet.SnapVisible': Sheet.SnapVisible,
    'Sheet.Title': Sheet.Title,
  },
  render(e) {
    return (
      <YBox style={inlineStyle(() => ({ base: { padding: 100 } }))}>
        <Sheet {...e}>
          <Sheet.Trigger asChild>
            <Button>
              <Button.Text>Button</Button.Text>
            </Button>
          </Sheet.Trigger>
          <Sheet.Frame>
            <Sheet.Title>
              <Input />
            </Sheet.Title>
            <Text>Hello world</Text>
            <Sheet.Footer>
              <Sheet.Trigger asChild>
                <Button>
                  <Button.Text>Close</Button.Text>
                </Button>
              </Sheet.Trigger>
            </Sheet.Footer>
          </Sheet.Frame>
        </Sheet>
      </YBox>
    );
  },
  argTypes: {
    full: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
export const FullHeight: Story = {
  ...Primary,
  args: { full: true },
};
export const WithScroll: Story = {
  ...Primary,
  render(e) {
    return (
      <YBox style={inlineStyle(() => ({ base: { padding: 100 } }))}>
        <Sheet {...e}>
          <Sheet.Trigger asChild>
            <Button>
              <Button.Text>Button</Button.Text>
            </Button>
          </Sheet.Trigger>
          <Sheet.Frame>
            <Sheet.Title>Title</Sheet.Title>
            {Array.from(Array(60).keys()).map((i) => (
              <Text key={`${i}-render test`}>Hello world {i}</Text>
            ))}
            <Sheet.Footer>
              <Sheet.Trigger asChild>
                <Button>
                  <Button.Text>Close</Button.Text>
                </Button>
              </Sheet.Trigger>
            </Sheet.Footer>
          </Sheet.Frame>
        </Sheet>
      </YBox>
    );
  },
};

export const WithScrollStickyHeader: Story = {
  ...WithScroll,
  args: { stickyHeader: true },
};
export const WithScrollStickyFooter: Story = {
  ...WithScroll,
  args: { stickyFooter: true },
};
export const WithScrollStickyHeaderAndFooter: Story = {
  ...WithScroll,
  args: { stickyHeader: true, stickyFooter: true },
};

export const WithScrollDetach: Story = {
  ...Primary,
  args: { detach: true, stickyFooter: true },
};
