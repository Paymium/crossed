/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import '@testing-library/jest-dom';
import { render, screen } from '@crossed/test';

import { createModalTitle } from '../ModalTitle';
import { forwardRef } from 'react';
import { ContextModal, useContext } from '../context';

jest.mock('../context');

const useContextMocked = useContext as unknown as jest.Mock<
  ReturnType<typeof useContext>
>;
const Comp = forwardRef((p: any, ref: any) => <div {...p} ref={ref} />);
const NewComp = createModalTitle(Comp);

describe('createModalTitle', () => {
  beforeEach(() => {
    useContextMocked.mockImplementation(() => ({ id: 'id' } as ContextModal));
  });

  afterEach(() => {
    useContextMocked.mockReset();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('simple', async () => {
    render(<NewComp>h</NewComp>);

    expect(useContextMocked).toHaveBeenCalled();

    const el = await screen.getByText('h');
    expect(el).toHaveAttribute('id', 'id-title');
  });
});
