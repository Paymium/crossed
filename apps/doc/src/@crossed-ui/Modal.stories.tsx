/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { YBox, Button, Text, Input, Sheet, SelectNew } from '@crossed/ui';
import { Modal } from '@crossed/ui/src/overlay/Modal';
import { inlineStyle } from '@crossed/styled';
import { useState } from 'react';
import { ModalProps } from '@crossed/ui/src/overlay/Modal/Root';
// import { ScrollView } from 'react-native-web';

const Render = (e: ModalProps) => {
  const [value, setValue] = useState('');
  return (
    <YBox style={inlineStyle(() => ({ base: { padding: 100 } }))}>
      <Modal {...e}>
        <Modal.Trigger asChild>
          <Button>
            <Button.Text>Button</Button.Text>
          </Button>
        </Modal.Trigger>
        <Modal.Content>
          <Modal.Header />
          <Modal.Body>
            <Input onChangeText={setValue} value={value} />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </YBox>
  );
};

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
};

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

export const ClickOverlayNotClose: Story = {
  args: { floatingProps: { closeOverlayPress: false } },
};
export const AdaptToSheet: Story = {
  args: { adapt: true },
};
export const AdaptToSheetWithInput: Story = {
  args: { adapt: true },
  render: Render,
};
export const Scrollview: Story = {
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
            <Modal.Header>
              <Modal.Title>Title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Text key={`render`}>Hello world</Text>
              {Array.from(Array(60).keys()).map((i) => (
                <Text key={`render${i}`}>Hello world {i}</Text>
              ))}
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
};

export const ScrollviewStickyHeader: Story = {
  ...Scrollview,
  args: { stickyHeader: true },
};
export const ScrollviewStickyFooter: Story = {
  ...Scrollview,
  args: { stickyFooter: true },
};
export const ScrollviewStickyHeaderAndFooter: Story = {
  ...Scrollview,
  args: { stickyHeader: true, stickyFooter: true },
};

export const ScrollviewWithAdapt: Story = {
  ...Scrollview,
  args: { adapt: true },
};
export const ScrollviewWithAdaptStickyHeader: Story = {
  ...Scrollview,
  args: { adapt: true, stickyHeader: true },
};
export const ScrollviewWithAdaptStickyFooter: Story = {
  ...Scrollview,
  args: { adapt: true, stickyFooter: true },
};
export const ScrollviewWithAdaptStickyHeaderAndFooter: Story = {
  ...Scrollview,
  args: { adapt: true, stickyHeader: true, stickyFooter: true },
};

const RenderOther = (e: ModalProps) => {
  return (
    <YBox style={inlineStyle(() => ({ base: { padding: 100 } }))}>
      <Modal {...e}>
        <Modal.Trigger asChild>
          <Button>
            <Button.Text>Button</Button.Text>
          </Button>
        </Modal.Trigger>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Sheet>
              <Sheet.Trigger asChild>
                <Button>
                  <Button.Text>Open</Button.Text>
                </Button>
              </Sheet.Trigger>
              <Sheet.Content>
                <Text>Sheet content</Text>
              </Sheet.Content>
            </Sheet>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </YBox>
  );
};
export const ModalOpenSheet: Story = {
  ...Scrollview,
  args: { adapt: true },
  render: RenderOther,
};

const RenderSelect = (e: ModalProps) => {
  return (
    <YBox style={inlineStyle(() => ({ base: { padding: 100 } }))}>
      <Modal {...e}>
        <Modal.Trigger asChild>
          <Button>
            <Button.Text>Button</Button.Text>
          </Button>
        </Modal.Trigger>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SelectNew>
              <SelectNew.Trigger>
                <SelectNew.Value />
              </SelectNew.Trigger>
              <SelectNew.Content>
                <SelectNew.Option value="select1">
                  <Text>Sheet content</Text>
                </SelectNew.Option>
                <SelectNew.Option value="select2">
                  <Text>Sheet content</Text>
                </SelectNew.Option>
              </SelectNew.Content>
            </SelectNew>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </YBox>
  );
};

export const ModalWithSelect: Story = {
  ...Scrollview,
  args: { adapt: true },
  render: RenderSelect,
};
