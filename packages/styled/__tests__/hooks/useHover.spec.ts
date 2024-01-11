import { renderHook } from '@crossed/test';
import { useHover } from '../../src/hooks/useHover';
import { act } from 'react-dom/test-utils';

describe('useHover', () => {
  test('basic', () => {
    const props = {
      onPointerEnter: jest.fn(),
      onPointerLeave: jest.fn(),
    };
    const { result, rerender } = renderHook(() => useHover(props));
    expect(Object.keys(result.current)).toEqual([
      'hovered',
      'onPointerLeave',
      'onPointerEnter',
    ]);
    expect(result.current.hovered).toEqual(false);

    act(() => result.current.onPointerEnter({}));
    expect(props.onPointerEnter).toBeCalled();
    rerender();
    expect(result.current.hovered).toEqual(true);

    act(() => result.current.onPointerLeave({}));
    expect(props.onPointerLeave).toBeCalled();
    rerender();
    expect(result.current.hovered).toEqual(false);
  });
});
