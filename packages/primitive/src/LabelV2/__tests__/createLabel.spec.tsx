/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import '@testing-library/jest-dom';
import { createLabel } from '../createLabel';
import { useContext, type ContextLabel } from '../context';
import { render, screen } from '@crossed/test';

jest.mock('../context');
const Comp = (p: any) => <p {...p} />;
const NewComp = createLabel(Comp);

const useContextMocked = useContext as unknown as jest.Mock<ContextLabel>;

describe('createLabel', () => {
  beforeEach(() => {
    useContextMocked.mockImplementation(() => ({
      id: 'id',
    }));
  });

  afterEach(() => {
    useContextMocked.mockReset();
  });

  test('add id to comp', async () => {
    const child = 'Pass child';
    render(<NewComp>{child}</NewComp>);

    expect(useContextMocked).toHaveBeenCalled();

    const text = await screen.getByText(child);
    expect(text).toHaveAttribute('id', 'id');
  });
});
