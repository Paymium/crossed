import { parseStyle } from '../src/parseStyle';

describe('parseStyle', () => {
  test('simple', () => {
    const toto = parseStyle({ lineHeight: 10, fontSize: 10 });
    expect(toto).toEqual({ lineHeight: '10px', fontSize: 10 });
  });
  test('empty', () => {
    const toto = parseStyle();
    expect(toto).toEqual(undefined);
  });
});
