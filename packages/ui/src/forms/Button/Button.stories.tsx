import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { Button } from './Button';

const ButtonMeta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  render: (args) => (
    <Button {...args}>
      <Button.Text>Button</Button.Text>
    </Button>
  ),
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'tertiary'],
    },
    error: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  args: {
    variant: 'primary',
  },
  decorators: [
    (Story) => (
      <View
        style={[
          { alignItems: 'center', justifyContent: 'center', flex: 1 },
          // { $$css: true, dark: 'light' },
        ]}
      >
        <Story />
      </View>
    ),
  ],
};

export default ButtonMeta;

export const Basic: StoryObj<typeof Button> = {
  args: {
    variant: 'primary',
    error: false,
    loading: false,
  },
};

export const Click: StoryObj<typeof Button> = {
  args: {
    variant: 'primary',
    error: false,
    loading: false,
  },
};
