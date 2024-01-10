import { renderHook } from '@crossed/test';
import { useFocus } from '../../src/hooks/useFocus';
import { act } from 'react-dom/test-utils';

describe('useFocus', () => {
  test('basic', () => {
    const props = {
      onFocus: jest.fn(),
      onBlur: jest.fn(),
    };
    const { result, rerender } = renderHook(() => useFocus(props));
    expect(Object.keys(result.current)).toEqual(['focus', 'onFocus', 'onBlur']);
    expect(result.current.focus).toEqual(false);

    act(() => result.current.onFocus({}));
    expect(props.onFocus).toBeCalled();
    rerender();
    expect(result.current.focus).toEqual(true);

    act(() => result.current.onBlur({}));
    expect(props.onBlur).toBeCalled();
    rerender();
    expect(result.current.focus).toEqual(false);
  });
});
