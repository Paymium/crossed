import { renderHook } from '@crossed/test';
import { useActive } from '../../src/hooks/useActive';
import { act } from 'react-dom/test-utils';

describe('useActive', () => {
  test('basic', () => {
    const props = {
      onPointerUp: jest.fn(),
      onPointerDown: jest.fn(),
    };
    const { result, rerender } = renderHook(() => useActive(props));
    expect(Object.keys(result.current)).toEqual([
      'active',
      'onPointerUp',
      'onPointerDown',
    ]);
    expect(result.current.active).toEqual(false);

    act(() => result.current.onPointerDown({}));
    expect(props.onPointerDown).toBeCalled();
    rerender();
    expect(result.current.active).toEqual(true);

    act(() => result.current.onPointerUp({}));
    expect(props.onPointerUp).toBeCalled();
    rerender();
    expect(result.current.active).toEqual(false);
  });
});
