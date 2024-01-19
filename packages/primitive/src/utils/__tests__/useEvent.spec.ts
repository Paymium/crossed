/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useEvent, useGet } from '../useEvent';
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

jest.mock('react');

const useCallbackMocked = useCallback as jest.Mock<any>;
const useEffectMocked = useEffect as jest.Mock<any>;
const useLayoutEffectMocked = useLayoutEffect as jest.Mock<any>;
const useRefMocked = useRef as jest.Mock<any>;

describe('useEvent', () => {
  beforeEach(() => {
    useCallbackMocked.mockImplementation((e) => e);
    useEffectMocked.mockImplementation((e) => e());
    useLayoutEffectMocked.mockImplementation((e) => e());
    useRefMocked.mockImplementation(() => ({ current: undefined }));
  });

  afterEach(() => {
    useCallbackMocked.mockReset();
    useEffectMocked.mockReset();
    useLayoutEffectMocked.mockReset();
    useRefMocked.mockReset();
  });

  test('with callback', () => {
    const callback = jest.fn();
    const event = useEvent(callback);

    expect(useRefMocked).toBeCalled();
    expect(useLayoutEffectMocked).toBeCalled();
    expect(useCallbackMocked).toBeCalled();

    expect(typeof event).toBe('function');
    event();

    expect(callback).toBeCalled();
  });

  test('without callback', () => {
    const event = useEvent();

    expect(useRefMocked).toBeCalled();
    expect(useLayoutEffectMocked).toBeCalled();
    expect(useCallbackMocked).toBeCalled();

    expect(typeof event).toBe('function');
    event();
  });
});

describe('useGet', () => {
  beforeEach(() => {
    useCallbackMocked.mockImplementation((e) => e);
    useEffectMocked.mockImplementation((e) => e());
    useLayoutEffectMocked.mockImplementation((e) => e());
    useRefMocked.mockImplementation(() => ({ current: undefined }));
  });

  afterEach(() => {
    useCallbackMocked.mockReset();
    useEffectMocked.mockReset();
    useLayoutEffectMocked.mockReset();
    useRefMocked.mockReset();
  });

  test('simple', () => {
    const callback = jest.fn();
    const event = useGet(callback);

    expect(useRefMocked).toBeCalled();
    expect(useLayoutEffectMocked).toBeCalled();
    expect(useCallbackMocked).toBeCalled();

    expect(typeof event).toBe('function');
    const eventReturn = event();
    expect(typeof eventReturn).toBe('function');
    eventReturn();
    expect(callback).toBeCalled();
  });
});
