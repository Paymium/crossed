/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { FileUpload } from '@crossed/ui/src/forms/FileUpload';
import { YBox } from '@crossed/ui';
import { UploadCloud02 } from '@crossed/icons';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof FileUpload> = {
  component: FileUpload,
  subcomponents: {
    'FileUpload.Label': FileUpload.Label,
    'FileUpload.HelperText': FileUpload.HelperText,
    'FileUpload.Icon': FileUpload.Icon,
  },
  parameters: { layout: 'centered' },
  render(e) {
    return (
      <FileUpload space={'lg'} {...e}>
        <FileUpload.Icon>
          <UploadCloud02 />
        </FileUpload.Icon>
        <YBox alignItems={'center'}>
          <FileUpload.Label>Click to upload or drag and drop</FileUpload.Label>
          <FileUpload.HelperText>
            SVG, PNG, JPG or GIF (max. 800x400px)
          </FileUpload.HelperText>
        </YBox>
      </FileUpload>
    );
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const InProgress: Story = {
  args: {},
  render(e) {
    return (
      <FileUpload {...e}>
        <FileUpload.Dropzone space={"lg"}>
          <FileUpload.Icon>
            <UploadCloud02 />
          </FileUpload.Icon>
          <YBox alignItems={'center'}>
            <FileUpload.Label>
              Click to upload or drag and drop
            </FileUpload.Label>
            <FileUpload.HelperText>
              SVG, PNG, JPG or GIF (max. 800x400px)
            </FileUpload.HelperText>
          </YBox>
        </FileUpload.Dropzone>

        <FileUpload.Items />
      </FileUpload>
    );
  },
};
