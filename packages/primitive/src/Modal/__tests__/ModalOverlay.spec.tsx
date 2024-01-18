import '@testing-library/jest-dom';
import { render, screen, userEvent } from '@crossed/test';

import { createModalOverlay } from '../ModalOverlay';
import { forwardRef } from 'react';
import { ContextModal, useContext } from '../context';
import { composeEventHandlers } from '@crossed/core/src/composeEventHandlers';
import { Pressable, Text } from 'react-native';

jest.mock('../context');
jest.mock('@crossed/core/src/composeEventHandlers');

const composeEventHandlersMocked = composeEventHandlers as unknown as jest.Mock<
  ReturnType<typeof composeEventHandlers>
>;
const useContextMocked = useContext as unknown as jest.Mock<ContextModal>;

const Comp = forwardRef((p: any, ref: any) => <Pressable {...p} ref={ref} />);
const NewComp = createModalOverlay(Comp);

describe('createModalOverlay', () => {
  const setOpen = jest.fn();
  beforeEach(() => {
    useContextMocked.mockImplementation(
      () => ({ setOpen } as unknown as ContextModal)
    );
    composeEventHandlersMocked.mockImplementation((a, b) => () => {
      a();
      b();
    });
  });

  afterEach(() => {
    useContextMocked.mockReset();
    composeEventHandlersMocked.mockReset();
    setOpen.mockReset();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('closeOnPress true', async () => {
    const onPress = jest.fn();
    render(
      <NewComp onPress={onPress}>
        <Text>hello</Text>
      </NewComp>
    );

    // expect(composeEventHandlersMocked).toHaveBeenCalled();
    // expect(composeEventHandlersMocked.mock.calls[0]).toHaveLength(2);

    expect(useContextMocked).toHaveBeenCalled();

    const el = await screen.getByText('hello');
    await userEvent.click(el);

    expect(onPress).toHaveBeenCalled();
    expect(setOpen).toHaveBeenCalledWith(false);
  });

  test('closeOnPress false', async () => {
    const onPress = jest.fn();
    render(
      <NewComp onPress={onPress} closeOnPress={false}>
        <Text>hello</Text>
      </NewComp>
    );

    // expect(composeEventHandlersMocked).toHaveBeenCalled();
    // expect(composeEventHandlersMocked.mock.calls[0]).toHaveLength(2);

    expect(useContextMocked).toHaveBeenCalled();

    const el = await screen.getByText('hello');
    await userEvent.click(el);

    expect(onPress).toHaveBeenCalled();
    expect(setOpen).toBeCalledTimes(0);
  });
});
