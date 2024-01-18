import { parseStyle } from '../src/parseStyle';

describe('parseStyle', () => {
  test('simple', () => {
    const style = parseStyle({ lineHeight: 10, fontSize: 10 });
    expect(style).toEqual({ lineHeight: '10px', fontSize: 10 });
  });
  test('empty', () => {
    const style = parseStyle();
    expect(style).toEqual(undefined);
  });
});
