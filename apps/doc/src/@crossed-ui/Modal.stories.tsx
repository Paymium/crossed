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
import { ModalProps } from '@crossed/ui/src/overlay/Modal/Root';

const RenderBasic = (e: ModalProps) => {
  return (
    <YBox style={inlineStyle(() => ({ base: { padding: 100 } }))}>
      <Modal {...e}>
        <Modal.Trigger asChild>
          <Button>
            <Button.Text>Button</Button.Text>
          </Button>
        </Modal.Trigger>
        <Modal.Content>
          <Modal.Padded>
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
          </Modal.Padded>
        </Modal.Content>
      </Modal>
    </YBox>
  );
};

const meta: Meta<typeof Modal> = {
  component: Modal,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  subcomponents: {
    'Modal.Trigger': Modal.Trigger,
    'Modal.Header': Modal.Header,
    'Modal.Title': Modal.Title,
    'Modal.Footer': Modal.Footer,
    'Modal.Content': Modal.Content,
  },
  render: RenderBasic,
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
export const SizeSm: Story = { args: { size: 'sm' } };
export const SizeMd: Story = { args: { size: 'md' } };
export const SizeLg: Story = { args: { size: 'lg' } };
export const AdaptToSheet: Story = {
  args: { adapt: true },
};

export const WithScrollView: Story = {
  args: { adapt: true },
  render(e) {
    return (
      <YBox style={inlineStyle(() => ({ base: { padding: 100 } }))}>
        <Modal {...e}>
          <Modal.Trigger asChild>
            <Button>
              <Button.Text>Button</Button.Text>
            </Button>
          </Modal.Trigger>
          <Modal.Content>
            <Modal.Padded>
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
            </Modal.Padded>
          </Modal.Content>
        </Modal>
      </YBox>
    );
  },
};

export const NotClosable: Story = {
  args: { adapt: true },
  render(e) {
    return (
      <YBox style={inlineStyle(() => ({ base: { padding: 100 } }))}>
        <Modal closable={false} {...e}>
          <Modal.Trigger asChild>
            <Button>
              <Button.Text>Button</Button.Text>
            </Button>
          </Modal.Trigger>
          <Modal.Content>
            <Modal.Padded>
              <Modal.Header>
                <Modal.Title>Title</Modal.Title>
              </Modal.Header>
            </Modal.Padded>
            <Modal.ScrollView>
              <Modal.Padded>
                <Modal.Body>
                  {Array.from(Array(100).keys()).map((i) => {
                    return (
                      <Text key={`${i}-test-scrollview`}>Hello world</Text>
                    );
                  })}
                </Modal.Body>
              </Modal.Padded>
            </Modal.ScrollView>
            <Modal.Padded>
              <Modal.Footer>
                <Button variant="tertiary">
                  <Button.Text>Button</Button.Text>
                </Button>

                <Button>
                  <Button.Text>Button</Button.Text>
                </Button>
              </Modal.Footer>
            </Modal.Padded>
          </Modal.Content>
        </Modal>
      </YBox>
    );
  },
};
