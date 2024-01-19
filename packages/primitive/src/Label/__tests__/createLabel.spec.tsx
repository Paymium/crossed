/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import '@testing-library/jest-dom';
import { forwardRef } from 'react';

import { createLabel } from '../index';
import { createLabelMain } from '../Label';
import { LabelInput } from '../LabelInput';
import { createLabelText } from '../LabelText';
import * as allExport from '../index';

const createLabelMainMocked = createLabelMain as unknown as jest.Mock<any>;
const createLabelTextMocked = createLabelText as unknown as jest.Mock<any>;
const LabelInputMocked = (LabelInput as any)
  .render as unknown as jest.Mock<any>;

jest.mock('../Label');
jest.mock('../LabelInput');
jest.mock('../LabelText');

describe('createLabel', () => {
  beforeEach(() => {
    createLabelMainMocked.mockImplementation((e: any) => e);
    createLabelTextMocked.mockImplementation((e: any) => e);
    LabelInputMocked.mockImplementation((e: any) => e);
  });

  afterEach(() => {
    createLabelMainMocked.mockReset();
    createLabelTextMocked.mockReset();
    LabelInputMocked.mockReset();
  });

  test('check exports', () => {
    expect(Object.keys(allExport)).toEqual(['useLabelContext', 'createLabel']);
  });

  test('init', async () => {
    const Root = forwardRef((p: any, ref: any) => <p {...p} ref={ref} />);
    const Text = forwardRef((p: any, ref: any) => <p {...p} ref={ref} />);

    const Label = createLabel({
      Root,
      Text,
    });

    expect(createLabelMainMocked).toHaveBeenCalledWith(Root);
    expect(createLabelTextMocked).toHaveBeenCalledWith(Text);

    expect(Label).toHaveProperty('displayName', 'Label');
    expect(Label.Text).toHaveProperty('displayName', 'Label.Text');
    expect(Label.Input).toHaveProperty('displayName', 'Label.Input');
  });
});
