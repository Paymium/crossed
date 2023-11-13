import { deepMerge } from '../../src/crossed/deepMerge';

describe('deepMerge', () => {
  test('Merge empty one and empty two', () => {
    expect(deepMerge({}, {})).toStrictEqual({});
  });
  test('Merge empty style', () => {
    expect(deepMerge({ props: { style: {} } }, {})).toStrictEqual({
      props: { style: {} },
    });
  });
  test('Merge one and empty two', () => {
    expect(deepMerge({ className: [] }, {})).toStrictEqual({ className: [] });
    expect(deepMerge({ className: ['test'] }, {})).toStrictEqual({
      className: ['test'],
    });
    expect(
      deepMerge({ className: ['test'], props: { myProps: 'ici' } }, {})
    ).toStrictEqual({
      className: ['test'],
      props: { myProps: 'ici' },
    });
  });
  test('Merge empty one and two', () => {
    expect(deepMerge({}, { className: [] })).toStrictEqual({ className: [] });
    expect(deepMerge({}, { className: ['test'] })).toStrictEqual({
      className: ['test'],
    });
    expect(
      deepMerge({}, { className: ['test'], props: { myProps: 'ici' } })
    ).toStrictEqual({
      className: ['test'],
      props: { myProps: 'ici' },
    });
  });
  test('Merge one and two', () => {
    expect(
      deepMerge(
        {
          'className': ['text-neutral-600'],
          'props': { myProps: 'ici', p1: false },
          ':dark': { className: ['bg-neutral-500'] },
          ':light': {
            className: ['bg-neutral-500'],
            props: { myProps: 'ici', p2: false },
          },
        },
        {
          'className': ['text-neutral-700'],
          'props': { myProps: 'et non', p2: true },
          ':dark': { className: [] },
          ':light': {
            className: ['bg-neutral-700'],
            props: { p1: 'ici', myProps: 'la' },
          },
        }
      )
    ).toStrictEqual({
      'className': ['text-neutral-700'],
      'props': { myProps: 'et non', p2: true, p1: false },
      ':dark': { className: ['bg-neutral-500'] },
      ':light': {
        className: ['bg-neutral-700'],
        props: { p1: 'ici', myProps: 'la', p2: false },
      },
    });
  });
});
