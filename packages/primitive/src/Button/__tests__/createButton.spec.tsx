/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import '@testing-library/jest-dom';
import { forwardRef } from 'react';

import { createButton } from '../index';
import { createButtonMain } from '../Button';
import { createButtonText } from '../ButtonText';
import { createButtonElement } from '../ButtonElement';
import { createButtonGroup } from '../ButtonGroup';
import * as allExport from '../index';

const createButtonMainMocked = createButtonMain as unknown as jest.Mock<any>;
const createButtonTextMocked = createButtonText as unknown as jest.Mock<any>;
const createButtonElementMocked =
  createButtonElement as unknown as jest.Mock<any>;
const createButtonGroupMocked = createButtonGroup as unknown as jest.Mock<any>;

jest.mock('../Button');
jest.mock('../ButtonText');
jest.mock('../ButtonElement');
jest.mock('../ButtonGroup');

describe('createButton', () => {
  beforeEach(() => {
    createButtonMainMocked.mockImplementation((e: any) => e);
    createButtonTextMocked.mockImplementation((e: any) => e);
    createButtonElementMocked.mockImplementation((e: any) => e);
    createButtonGroupMocked.mockImplementation((e: any) => e);
  });

  afterEach(() => {
    createButtonMainMocked.mockReset();
    createButtonTextMocked.mockReset();
    createButtonElementMocked.mockReset();
    createButtonGroupMocked.mockReset();
  });

  test('check exports', () => {
    expect(Object.keys(allExport)).toEqual([
      'createButton',
      'useButtonContext',
      'useButtonGroupCollection',
      'useButtonGroupContext',
    ]);
  });

  test('init', async () => {
    const Element = forwardRef((p: any, ref: any) => <p {...p} ref={ref} />);
    const Group = forwardRef((p: any, ref: any) => <p {...p} ref={ref} />);
    const Root = forwardRef((p: any, ref: any) => <p {...p} ref={ref} />);
    const Icon = forwardRef((p: any, ref: any) => <p {...p} ref={ref} />);
    const Text = forwardRef((p: any, ref: any) => (
      <p {...p} ref={ref} />
    )) as any;

    const Button = createButton({
      Element,
      Group,
      Root,
      Text,
      Icon,
    });

    expect(createButtonMainMocked).toHaveBeenCalledWith(Root);
    expect(createButtonTextMocked).toHaveBeenCalledWith(Text);
    expect(createButtonElementMocked).toHaveBeenCalledWith(Element);
    expect(createButtonGroupMocked).toHaveBeenCalledWith(Group);

    expect(Button).toHaveProperty('displayName', 'Button');
    expect(Button.Text).toHaveProperty('displayName', 'ButtonText');
    expect(Button.Group).toHaveProperty('displayName', 'ButtonGroup');
    expect(Button.Element).toHaveProperty('displayName', 'ButtonElement');
  });
});
