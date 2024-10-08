/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Button, Sheet, Text, YBox } from '@crossed/ui';
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
    'Sheet.Header': Sheet.Header,
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
            <Sheet.Header>
              <Sheet.Title>Title</Sheet.Title>
            </Sheet.Header>
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
