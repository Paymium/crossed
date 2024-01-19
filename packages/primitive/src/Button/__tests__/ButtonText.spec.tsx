/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import '@testing-library/jest-dom';
import { render, screen } from '@crossed/test';
import { forwardRef } from 'react';

import { createButtonText } from '../ButtonText';
import { useContext, type ContextButton } from '../context';

const Comp = forwardRef((p: any, ref: any) => <p {...p} ref={ref} />);
const NewComp = createButtonText(Comp);

jest.mock('../context');

const useContextMocked = useContext as unknown as jest.Mock<ContextButton>;

describe('createButtonText', () => {
  beforeEach(() => {
    useContextMocked.mockImplementation(() => ({
      id: 'id',
    }));
  });

  afterEach(() => {
    useContextMocked.mockReset();
  });

  test('init', async () => {
    const child = 'Pass child';
    render(<NewComp>{child}</NewComp>);

    expect(useContextMocked).toHaveBeenCalled();

    const text = await screen.getByText(child);
    expect(text).toHaveAttribute('id', 'id');
  });
});
