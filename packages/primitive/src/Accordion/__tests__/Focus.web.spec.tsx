/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import '@testing-library/jest-dom';

import { Focus, useFocus } from '../Focus.web';
import { View } from 'react-native';
import { renderHook, render, screen } from '@crossed/test';
import type { KeyboardEvent } from 'react';

jest.mock('react-focus-lock', () => ({
  __esModule: true,
  useFocusScope: jest
    .fn()
    .mockImplementation(() => ({ focusNext: jest.fn(), focusPrev: jest.fn() })),
  default: jest.fn().mockImplementation(({ children }) => children),
}));

describe('Accordion Focus web', () => {
  test('Component', async () => {
    const children = 'Pass child';
    const ReactFocusLock = jest.requireMock('react-focus-lock');
    render(<Focus testID="toto">{children}</Focus>);

    await screen.findByText(children);
    expect(ReactFocusLock.default).toBeCalledWith(
      {
        children,
        disabled: true,
        lockProps: { testID: 'toto' },
        as: View,
      },
      {}
    );
  });

  test('useFocus', async () => {
    const onPress = jest.fn();
    const { useFocusScope } = jest.requireMock('react-focus-lock');
    const focusNext = jest.fn();
    const focusPrev = jest.fn();
    const stopPropagation = jest.fn();
    const preventDefault = jest.fn();
    useFocusScope.mockImplementation(() => ({ focusNext, focusPrev }));
    const { result } = renderHook(() => useFocus({ onPress }));
    const reset = () => {
      stopPropagation.mockReset();
      preventDefault.mockReset();
      focusNext.mockReset();
      focusPrev.mockReset();
    };

    expect(result.current).toHaveProperty(['onKeyDown']);
    const params = {
      stopPropagation,
      preventDefault,
    } as unknown as KeyboardEvent<HTMLButtonElement>;
    result.current.onKeyDown(params);
    expect(stopPropagation).toBeCalledTimes(0);
    expect(preventDefault).toBeCalledTimes(0);
    expect(onPress).toBeCalledTimes(0);
    expect(focusNext).toBeCalledTimes(0);
    expect(focusPrev).toBeCalledTimes(0);
    reset();

    result.current.onKeyDown({ ...params, code: 'ArrowDown' });
    expect(stopPropagation).toBeCalledTimes(1);
    expect(preventDefault).toBeCalledTimes(1);
    expect(onPress).toBeCalledTimes(0);
    expect(focusNext).toBeCalledTimes(1);
    expect(focusPrev).toBeCalledTimes(0);
    reset();

    result.current.onKeyDown({ ...params, code: 'ArrowUp' });
    expect(stopPropagation).toBeCalledTimes(1);
    expect(preventDefault).toBeCalledTimes(1);
    expect(onPress).toBeCalledTimes(0);
    expect(focusNext).toBeCalledTimes(0);
    expect(focusPrev).toBeCalledTimes(1);
    reset();

    result.current.onKeyDown({ ...params, code: 'Space' });
    expect(stopPropagation).toBeCalledTimes(1);
    expect(preventDefault).toBeCalledTimes(1);
    expect(onPress).toBeCalledTimes(1);
    expect(focusNext).toBeCalledTimes(0);
    expect(focusPrev).toBeCalledTimes(0);
    reset();
  });
});
