import { Signal, renderHook } from '@crossed/test';
import { useFocus } from '../../src/hooks/useFocus';
import { act } from 'react-dom/test-utils';

jest.mock('@preact/signals-react', () => {
  const t = new Signal(false);
  return {
    useComputed: jest.fn((cb) => new Signal(cb())),
    useSignal: jest.fn(() => {
      return t;
    }),
  };
});

describe('useFocus', () => {
  test('basic', () => {
    const props = {
      onFocus: jest.fn(),
      onBlur: jest.fn(),
    };
    const { result, rerender } = renderHook(() => useFocus(props));
    expect(Object.keys(result.current)).toEqual(['focus', 'actions']);
    expect(Object.keys(result.current.actions)).toEqual(['onFocus', 'onBlur']);
    expect(result.current.focus.value).toEqual(false);

    act(() => result.current.actions.onFocus({}));
    expect(props.onFocus).toBeCalled();
    rerender();
    expect(result.current.focus.value).toEqual(true);

    act(() => result.current.actions.onBlur({}));
    expect(props.onBlur).toBeCalled();
    rerender();
    expect(result.current.focus.value).toEqual(false);
  });
});
