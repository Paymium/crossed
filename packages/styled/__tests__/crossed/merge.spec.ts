import { merge } from '../../src/crossed/merge';
import type { State } from '@crossed/core';

const baseOne: State<any>[':active'] = {
  ':dark': { className: ['bg-neutral-500'] },
  ':light': {
    className: ['bg-neutral-500'],
    props: { myProps: 'ici', p2: false },
  },
};
const baseTow: State<any>[':active'] = {
  ':dark': { className: [] },
  ':light': {
    className: ['bg-neutral-700'],
    props: { p1: 'ici', myProps: 'la' },
  },
};

const result = {
  ':dark': { className: ['bg-neutral-500'] },
  ':light': {
    className: ['bg-neutral-700'],
    props: { p1: 'ici', myProps: 'la', p2: false },
  },
};

describe('merge', () => {
  test('Merge empty one and empty two', () => {
    expect(merge({}, {})).toStrictEqual({ ':dark': {}, ':light': {} });
  });

  test(':base', () => {
    expect(
      merge(
        {
          ':active': baseOne,
          'className': ['bg-neutral-700'],
          'props': { p1: 'ici', myProps: 'ici' },
        },
        {
          ':active': baseTow,
          'className': ['bg-neutral-600'],
          'props': { myProps: 'la', p2: false },
        }
      )
    ).toStrictEqual({
      ':active': result,
      'className': ['bg-neutral-600'],
      ':dark': { className: ['bg-neutral-600'] },
      ':light': { className: ['bg-neutral-600'] },
      'props': { p1: 'ici', myProps: 'la', p2: false },
    });
  });

  test(':active', () => {
    expect(merge({ ':active': baseOne }, { ':active': baseTow })).toStrictEqual(
      {
        ':active': result,
        ':dark': {},
        ':light': {},
      }
    );
  });

  test(':disabled', () => {
    expect(
      merge({ ':disabled': baseOne }, { ':disabled': baseTow })
    ).toStrictEqual({
      ':disabled': result,
      ':dark': {},
      ':light': {},
    });
  });
  test(':focus', () => {
    expect(merge({ ':focus': baseOne }, { ':focus': baseTow })).toStrictEqual({
      ':focus': result,
      ':dark': {},
      ':light': {},
    });
  });
  test(':hover', () => {
    expect(merge({ ':hover': baseOne }, { ':hover': baseTow })).toStrictEqual({
      ':hover': result,
      ':dark': {},
      ':light': {},
    });
  });
  test(':dark', () => {
    expect(merge({ ':dark': baseOne }, { ':dark': baseTow })).toStrictEqual({
      ':dark': result,
      ':light': {},
    });
  });
  test(':light', () => {
    expect(merge({ ':light': baseOne }, { ':light': baseTow })).toStrictEqual({
      ':light': result,
      ':dark': {},
    });
  });
});
