/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import '@testing-library/jest-dom';
import { render, screen } from '@crossed/test';

import { ReactNode, forwardRef } from 'react';
import { Provider, ContextModal, useContext } from '../context';
import { RemoveScroll } from 'react-remove-scroll';
import { Pressable, Text } from 'react-native';
import { createModalPortal } from '../ModalPortal';

jest.mock('../context');
jest.mock('react-remove-scroll');

const useContextMocked = useContext as unknown as jest.Mock<
  ReturnType<typeof useContext>
>;
const RemoveScrollMocked = (RemoveScroll as any).render as jest.Mock<ReactNode>;
const ProviderMocked = Provider as jest.Mock<ReactNode>;

const Comp = forwardRef((p: any, ref: any) => <Pressable {...p} ref={ref} />);
const NewComp = createModalPortal(Comp);

describe('createModalPortal', () => {
  beforeEach(() => {
    RemoveScrollMocked.mockImplementation(({ children }) => children);
    ProviderMocked.mockImplementation(({ children }) => children);
  });

  afterEach(() => {
    ProviderMocked.mockReset();
    RemoveScrollMocked.mockReset();
    useContextMocked.mockReset();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('not open', async () => {
    useContextMocked.mockImplementation(
      () => ({ open: false } as ContextModal)
    );
    const Comp = forwardRef((p: any, ref: any) => (
      <Pressable {...p} ref={ref} />
    ));
    const NewComp = createModalPortal(Comp);

    render(<NewComp />);

    expect(RemoveScrollMocked).toHaveBeenCalledTimes(0);
    expect(ProviderMocked).toHaveBeenCalledTimes(0);
  });

  test('open', async () => {
    useContextMocked.mockImplementation(() => ({ open: true } as ContextModal));
    render(
      <NewComp>
        <Text>hello</Text>
      </NewComp>
    );

    expect(RemoveScrollMocked).toHaveBeenCalled();
    expect(RemoveScrollMocked.mock.calls[0][0]).toHaveProperty('enabled', true);
    expect(ProviderMocked.mock.calls[0][0]).toHaveProperty('children');

    expect(useContextMocked).toBeCalled();

    expect(ProviderMocked).toBeCalled();
    expect(ProviderMocked.mock.calls[0][0]).toHaveProperty('open', true);
    expect(ProviderMocked.mock.calls[0][0]).toHaveProperty('children');

    await screen.findByText('hello');
  });
});
