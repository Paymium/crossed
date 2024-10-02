import type { Meta, StoryObj } from '@storybook/react';

import { Sheet, Text, YBox } from '@crossed/ui';
import { inlineStyle } from '@crossed/styled';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Sheet> = {
  title: '@crossed⁄ui/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  subcomponents: {
    'Sheet.Trigger': Sheet.Trigger,
    'Sheet.Frame': Sheet.Frame,
    'Sheet.SnapVisible': Sheet.SnapVisible,
  },
  render(e) {
    return (
      <YBox style={inlineStyle(() => ({ base: { padding: 100 } }))}>
        <Sheet {...e}>
          <Sheet.Trigger>Button</Sheet.Trigger>
          <Sheet.Frame>
            <Text>Hello world</Text>
          </Sheet.Frame>
        </Sheet>
      </YBox>
    );
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
