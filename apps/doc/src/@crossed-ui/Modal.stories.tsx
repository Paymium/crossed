/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { YBox, Button, Text } from '@crossed/ui';
import { Modal } from '@crossed/ui/src/overlay/Modal';
import { inlineStyle } from '@crossed/styled';

const meta: Meta<typeof Modal> = {
  component: Modal,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  subcomponents: {
    'Modal.Trigger': Modal.Trigger,
    'Modal.Header': Modal.Header,
    'Modal.Title': Modal.Title,
    'Modal.Footer': Modal.Footer,
    'Modal.Content': Modal.Content,
  },
  render({ closeOnPress, ...e }: any) {
    return (
      <YBox style={inlineStyle(() => ({ base: { padding: 100 } }))}>
        <Modal {...e}>
          <Modal.Trigger asChild>
            <Button>
              <Button.Text>Button</Button.Text>
            </Button>
          </Modal.Trigger>
          <Modal.Content closeOnPress={closeOnPress}>
            <Modal.Header>
              <Modal.Title>Title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Text>Hello world</Text>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="tertiary">
                <Button.Text>Button</Button.Text>
              </Button>

              <Button>
                <Button.Text>Button</Button.Text>
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
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

export const ClickOverlayNotClose: Story = {
  args: { closeOnPress: false } as any,
};
export const AdaptToSheet: Story = {
  args: { adapt: true },
};
