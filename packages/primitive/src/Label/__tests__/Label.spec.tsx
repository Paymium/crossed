/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import '@testing-library/jest-dom';
import { render, screen } from '@crossed/test';

import { createLabelMain } from '../Label';
import React, { ReactNode, forwardRef } from 'react';
import { Provider } from '../context';

jest.mock('../context');

const Comp = forwardRef((p: any, ref: any) => <div {...p} ref={ref} />);
const NewComp = createLabelMain(Comp);

const ProviderMocked = Provider as unknown as jest.Mock<ReactNode>;

describe('createLabelMain', () => {
  const oldUseId = React.useId;
  const oldUseRef = React.useRef;

  beforeEach(() => {
    React.useId = jest.fn(() => 'id');
    React.useRef = jest.fn(() => ({ current: undefined }));
    ProviderMocked.mockImplementation(({ children }: any) => <>{children}</>);
  });

  afterEach(() => {
    React.useId = oldUseId;
    React.useRef = oldUseRef;
    ProviderMocked.mockReset();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('init', async () => {
    const child = 'Pass child';
    render(<NewComp>{child}</NewComp>);

    expect(React.useId).toBeCalled();
    expect(React.useRef).toBeCalled();

    expect(ProviderMocked).toBeCalled();
    expect(ProviderMocked.mock.calls[0][0]).toHaveProperty('id', 'id');
    expect(ProviderMocked.mock.calls[0][0]).toHaveProperty('inputRef', {
      current: undefined,
    });
    expect(ProviderMocked.mock.calls[0][0]).toHaveProperty('children');

    await screen.findByText(child);
  });
});
