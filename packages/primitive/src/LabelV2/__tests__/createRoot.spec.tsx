/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import '@testing-library/jest-dom';
import { createRoot } from '../createRoot';
import { Provider } from '../context';
import type { ReactNode } from 'react';
import React from 'react';
import { render, screen } from '@crossed/test';

jest.mock('../context');
const ProviderMocked = Provider as unknown as jest.Mock<ReactNode>;
const Comp = (p: any) => <div {...p} />;
const NewComp = createRoot(Comp);

describe('createRoot', () => {
  const oldUseId = React.useId;
  beforeEach(() => {
    React.useId = jest.fn(() => 'id');
    ProviderMocked.mockImplementation(({ children }: any) => <>{children}</>);
  });
  afterEach(() => {
    React.useId = oldUseId;
    ProviderMocked.mockReset();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('provide id', async () => {
    const child = 'Pass child';
    render(<NewComp>{child}</NewComp>);

    expect(React.useId).toHaveBeenCalled();
    expect(ProviderMocked).toHaveBeenCalled();
    expect(ProviderMocked.mock.calls[0][0]).toHaveProperty('id', 'id');
    expect(ProviderMocked.mock.calls[0][0]).toHaveProperty('children');
    const text = await screen.getByText(child);
    expect(text).toHaveAttribute('role', 'label');
  });
});
