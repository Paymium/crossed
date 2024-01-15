import { renderHook } from '@crossed/test';
import { useActive } from '../../src/hooks/useActive';
import { act } from 'react-dom/test-utils';

jest.mock('@preact/signals-react', () => {
  class Toto {
    private _value: boolean;
    constructor(e: boolean) {
      this._value = e;
    }
    get value() {
      return this._value;
    }
    set value(e) {
      this._value = e;
    }
  }

  const t = new Toto(false);
  return {
    useComputed: jest.fn((cb) => new Toto(cb())),
    useSignal: jest.fn(() => {
      return t;
    }),
  };
});

describe('useActive', () => {
  test('basic', () => {
    const props = {
      onPointerUp: jest.fn(),
      onPointerDown: jest.fn(),
    };
    const { result, rerender } = renderHook(() => useActive(props));
    expect(Object.keys(result.current)).toEqual(['active', 'actions']);
    expect(Object.keys(result.current.actions)).toEqual([
      'onPointerUp',
      'onPointerDown',
    ]);
    expect(result.current.active.value).toEqual(false);

    act(() => result.current.actions.onPointerDown({}));
    expect(props.onPointerDown).toBeCalled();
    rerender();
    expect(result.current.active.value).toEqual(true);

    act(() => result.current.actions.onPointerUp({}));
    expect(props.onPointerUp).toBeCalled();
    rerender();
    expect(result.current.active.value).toEqual(false);
  });
});
