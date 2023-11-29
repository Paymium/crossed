import { render } from '@crossed/test';
import { RemoveScroll } from '../index.native';

describe('RemoveScroll native', () => {
  test('should return null', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { container } = render(<RemoveScroll />);
    expect(container.innerHTML).toBe('');
  });
});
