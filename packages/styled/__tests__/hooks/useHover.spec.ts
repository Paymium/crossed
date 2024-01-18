import { Signal, renderHook } from '@crossed/test';
import { useHover } from '../../src/hooks/useHover';
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

describe('useHover', () => {
  test('basic', () => {
    const props = {
      onPointerEnter: jest.fn(),
      onPointerLeave: jest.fn(),
    };
    const { result, rerender } = renderHook(() => useHover(props));
    expect(Object.keys(result.current)).toEqual(['hovered', 'actions']);
    expect(Object.keys(result.current.actions)).toEqual([
      'onPointerEnter',
      'onPointerLeave',
    ]);
    expect(result.current.hovered.value).toEqual(false);

    act(() => result.current.actions.onPointerEnter({}));
    expect(props.onPointerEnter).toBeCalled();
    rerender();
    expect(result.current.hovered.value).toEqual(true);

    act(() => result.current.actions.onPointerLeave({}));
    expect(props.onPointerLeave).toBeCalled();
    rerender();
    expect(result.current.hovered.value).toEqual(false);
  });
});
