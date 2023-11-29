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
    const toto = useEvent(callback);

    expect(useRefMocked).toBeCalled();
    expect(useLayoutEffectMocked).toBeCalled();
    expect(useCallbackMocked).toBeCalled();

    expect(typeof toto).toBe('function');
    toto();

    expect(callback).toBeCalled();
  });

  test('without callback', () => {
    const toto = useEvent();

    expect(useRefMocked).toBeCalled();
    expect(useLayoutEffectMocked).toBeCalled();
    expect(useCallbackMocked).toBeCalled();

    expect(typeof toto).toBe('function');
    toto();
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
    const toto = useGet(callback);

    expect(useRefMocked).toBeCalled();
    expect(useLayoutEffectMocked).toBeCalled();
    expect(useCallbackMocked).toBeCalled();

    expect(typeof toto).toBe('function');
    const titi = toto();
    expect(typeof titi).toBe('function');
    titi();
    expect(callback).toBeCalled();
  });
});
