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
    'Sheet.Content': Sheet.Content,
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
          <Sheet.Content>
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
          </Sheet.Content>
        </Sheet>
      </YBox>
    );
  },
  argTypes: {
    full: { control: 'boolean' },
    detach: { control: 'boolean' },
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
export const WithFlatList: Story = {
  ...Primary,
  args: { detach: false },
  render(e) {
    return (
      <YBox style={inlineStyle(() => ({ base: { padding: 100 } }))}>
        <Sheet {...e}>
          <Sheet.Trigger asChild>
            <Button>
              <Button.Text>Button</Button.Text>
            </Button>
          </Sheet.Trigger>
          <Sheet.FlatList
            data={Array.from(Array(60).keys())}
            renderItem={({ item }) => <Text>{item}</Text>}
          />
        </Sheet>
      </YBox>
    );
  },
};

// export const WithScrollStickyHeader: Story = {
//   ...WithScroll,
//   args: { stickyHeader: true },
// };
// export const WithScrollStickyFooter: Story = {
//   ...WithScroll,
//   args: { stickyFooter: true },
// };
// export const WithScrollStickyHeaderAndFooter: Story = {
//   ...WithScroll,
//   args: { stickyHeader: true, stickyFooter: true },
// };

// export const WithScrollDetach: Story = {
//   ...Primary,
//   args: { detach: true, stickyFooter: true },
// };
