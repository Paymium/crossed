import '@testing-library/jest-dom';
import { render, screen } from '@crossed/test';

import { createLabelText } from '../LabelText';
import React, { forwardRef } from 'react';
import { ContextLabel, useContext } from '../context';
// import { composeEventHandlers } from '@crossed/core';
import { Text } from 'react-native';

jest.mock('../context');
jest.mock('@crossed/core/src/composeEventHandlers');

const Comp = forwardRef((p: any, ref: any) => (
  <Text {...p} role="label" ref={ref} />
));
const NewComp = createLabelText(Comp);

const useContextMocked = useContext as unknown as jest.Mock<ContextLabel>;
// const composeEventHandlersMocked =
//   composeEventHandlers as unknown as jest.Mock<ContextLabel>;

describe('createLabelMain', () => {
  beforeEach(() => {
    useContextMocked.mockImplementation(() => ({
      id: 'id',
      inputRef: { current: undefined },
    }));
    // composeEventHandlersMocked.mockImplementation(((a: any, b: any) => {
    //   a();
    //   b();
    // }) as any);
  });

  afterEach(() => {
    useContextMocked.mockReset();
    // composeEventHandlersMocked.mockReset();
  });

  test('init', async () => {
    const child = 'Pass child';
    const onPress = jest.fn();
    const onFocus = jest.fn();

    useContextMocked.mockImplementation(() => ({
      id: 'id',
      inputRef: { current: { focus: onFocus } as any },
    }));

    render(<NewComp onPress={onPress}>{child}</NewComp>);

    expect(useContextMocked).toBeCalled();
    // expect(composeEventHandlersMocked).toBeCalled();

    const el = await screen.getByText(child);
    expect(el).toHaveAttribute('id', 'label-id');

    el.click();
    expect(onPress).toHaveBeenCalled();
    expect(onFocus).toHaveBeenCalled();
  });
});
