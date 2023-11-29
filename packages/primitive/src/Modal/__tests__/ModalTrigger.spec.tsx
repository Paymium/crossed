import '@testing-library/jest-dom';
import { render, screen, userEvent } from '@crossed/test';

import { createModalTrigger } from '../ModalTrigger';
import { forwardRef } from 'react';
import { ContextModal, useContext } from '../context';
import { Pressable, Text } from 'react-native';
import { composeEventHandlers } from '@crossed/core/src/composeEventHandlers';

jest.mock('../context');
jest.mock('@crossed/core/src/composeEventHandlers');

const composeEventHandlersMocked = composeEventHandlers as unknown as jest.Mock<
  ReturnType<typeof composeEventHandlers>
>;
const useContextMocked = useContext as unknown as jest.Mock<ContextModal>;

const Comp = forwardRef((p: any, ref: any) => <Pressable {...p} ref={ref} />);
const NewComp = createModalTrigger(Comp);

describe('createModalTrigger', () => {
  const setOpen = jest.fn();
  beforeEach(() => {
    useContextMocked.mockImplementation(
      () => ({ setOpen, open: false } as unknown as ContextModal)
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

  test('init close', async () => {
    const onPress = jest.fn();
    render(
      <NewComp onPress={onPress}>
        <Text>hello</Text>
      </NewComp>
    );

    expect(composeEventHandlersMocked).toHaveBeenCalled();
    expect(composeEventHandlersMocked.mock.calls[0]).toHaveLength(2);

    expect(useContextMocked).toHaveBeenCalled();

    const el = await screen.getByText('hello');
    await userEvent.click(el);

    expect(onPress).toHaveBeenCalled();
    expect(setOpen).toHaveBeenCalledWith(true);
  });
  test('init open', async () => {
    useContextMocked.mockImplementation(
      () => ({ setOpen, open: true } as unknown as ContextModal)
    );
    const onPress = jest.fn();
    render(
      <NewComp onPress={onPress}>
        <Text>hello</Text>
      </NewComp>
    );

    expect(composeEventHandlersMocked).toHaveBeenCalled();
    expect(composeEventHandlersMocked.mock.calls[0]).toHaveLength(2);

    expect(useContextMocked).toHaveBeenCalled();

    const el = await screen.getByText('hello');
    await userEvent.click(el);

    expect(onPress).toHaveBeenCalled();
    expect(setOpen).toHaveBeenCalledWith(false);
  });
});
