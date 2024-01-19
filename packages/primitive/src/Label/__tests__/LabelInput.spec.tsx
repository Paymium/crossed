/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import '@testing-library/jest-dom';
import { render, screen } from '@crossed/test';

import { LabelInput } from '../LabelInput';
import { ContextLabel, useContext } from '../context';
// import { composeRefs } from '@crossed/core';

jest.mock('../context');
jest.mock('@crossed/core/src/composeRefs');

const useContextMocked = useContext as unknown as jest.Mock<ContextLabel>;
// const composeRefsMocked = composeRefs as unknown as jest.Mock<any>;

describe('createLabelMain', () => {
  beforeEach(() => {
    useContextMocked.mockImplementation(() => ({
      id: 'id',
      inputRef: { current: undefined },
    }));
  });

  afterEach(() => {
    useContextMocked.mockReset();
  });

  test('init', async () => {
    render(
      <LabelInput>
        <input data-testid="input" />
      </LabelInput>
    );

    expect(useContextMocked).toBeCalled();
    // expect(composeRefsMocked).toBeCalledWith({ current: undefined }, null);

    const el = await screen.getByTestId('input');
    expect(el).toHaveAttribute('id', 'id');
    expect(el).toHaveAttribute('aria-labelledby', 'label-id');
  });
});
